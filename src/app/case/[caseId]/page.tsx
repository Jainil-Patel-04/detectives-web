'use client';

import { useMemo, useState , useEffect } from 'react';
import { useParams } from 'next/navigation';
import Corkboard from '@/components/Corkboard';
import CaseFile from '@/components/CaseFile';
import AmbientEffect from '@/components/AmbientEffect';
import AccusationModal from '@/components/AccusationModal';
import { getTheme } from '@/lib/themes';  
import BackButton from '@/components/BackButton';
import HowItWorks from '@/components/HowItWorks';
import { getNextOptions, buildCapabilities, type OptionCandidate, type Capabilities } from '@/lib/questionTemplates';

export default function CasePage() {
  const params = useParams();
  const caseId = params.caseId as string;
  const theme = getTheme(caseId);

  const [graphData, setGraphData] = useState<{ nodes: any[]; links: any[] }>({ nodes: [], links: [] });
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [askedKeys, setAskedKeys] = useState<Set<string>>(new Set());
  const [showAccusation, setShowAccusation] = useState(false);
  const [capabilities, setCapabilities] = useState<Capabilities>({ outgoing: new Map(), incoming: new Map() });
  
  useEffect(() => {
    fetch(`/api/cases/${caseId}/capabilities`)
      .then((res) => res.json())
      .then((data) => setCapabilities(buildCapabilities(data.relationships || [])))
      .catch((err) => console.error('Failed to load capabilities:', err));
  }, [caseId]);

   const options: OptionCandidate[] = useMemo(
    () => getNextOptions(graphData, askedKeys, capabilities),
    [graphData, askedKeys, capabilities]
  );

  function mergeGraphData(newGraph: { nodes: any[]; links: any[] } | null) {
    if (!newGraph) return;
    setGraphData((prev) => ({
      nodes: [
        ...prev.nodes,
        ...newGraph.nodes.filter((n: any) => !prev.nodes.some((e) => e.id === n.id)).map((n: any) => ({ ...n, __addedAt: Date.now() })),
      ],
      links: [
        ...prev.links,
        ...newGraph.links
          .filter((l: any) => !prev.links.some((e) => e.source === l.source && e.target === l.target && e.label === l.label))
          .map((l: any) => ({ ...l, __addedAt: Date.now() })),
      ],
    }));
  }

  async function handleSelectOption(option: OptionCandidate) {
    setAskedKeys((prev) => new Set(prev).add(option.key));
    setMessages((prev) => [...prev, { role: 'user', text: option.label }]);
    setLoading(true);
    try {
      const res = await fetch(`/api/cases/${caseId}/guided-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: option.templateId, entityId: option.entityId, label: option.label }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', text: data.narrative }]);
      mergeGraphData(data.graphData);
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', text: 'Something went wrong pulling the records.' }]);
    } finally {
      setLoading(false);
    }
  }

  async function handleAskFreeText(question: string) {
    setMessages((prev) => [...prev, { role: 'user', text: question }]);
    setLoading(true);
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, caseId }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'ai', text: data.narrative }]);
      mergeGraphData(data.graphData);
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', text: 'Something went wrong pulling the records.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen relative" style={{ backgroundColor: theme.bgPrimary }}>
      <BackButton theme={theme} />
      <div
        className="flex-1 relative overflow-hidden"
        style={{
          backgroundColor: theme.bgPrimary,
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.025) 1px, transparent 1px),
            radial-gradient(circle at 70% 65%, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 40% 85%, rgba(255,255,255,0.025) 1px, transparent 1px),
            radial-gradient(circle at 90% 15%, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 45px 45px, 80px 80px, 55px 55px',
        }}
      >
        <AmbientEffect type={theme.ambient} color={theme.accentSecondary} />
        <Corkboard graphData={graphData} theme={theme} />
        <button
          onClick={() => setShowAccusation(true)}
          className="absolute bottom-6 right-6 z-10 px-5 py-3 rounded-full font-semibold text-white shadow-lg"
          style={{ backgroundColor: theme.accent }}
        >
          Make an Accusation
        </button>
      </div>
      <div className="w-96 border-l relative z-10" style={{ borderColor: theme.accent }}>
        <CaseFile
          messages={messages}
          options={options}
          onSelectOption={handleSelectOption}
          onAskFreeText={handleAskFreeText}
          loading={loading}
          theme={theme}
        />
      </div>
      {showAccusation && <AccusationModal caseId={caseId} theme={theme} onClose={() => setShowAccusation(false)} />}
    </div>
  );
}