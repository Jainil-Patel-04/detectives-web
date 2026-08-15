import neo4j, { Driver } from 'neo4j-driver';

let driver: Driver;

export function getDriver() {
// console.log('URI:', JSON.stringify(process.env.NEO4J_URI));
// console.log('USER:', JSON.stringify(process.env.NEO4J_USER));
// console.log('PASSWORD length:', process.env.NEO4J_PASSWORD?.length);
// console.log('PASSWORD first 3 chars:', process.env.NEO4J_PASSWORD?.slice(0, 3));
// console.log('PASSWORD last 3 chars:', process.env.NEO4J_PASSWORD?.slice(-3));
  if (!driver) {
    driver = neo4j.driver(
      process.env.NEO4J_URI!,
      neo4j.auth.basic(process.env.NEO4J_USER!, process.env.NEO4J_PASSWORD!)
    );
  }
  return driver;
}