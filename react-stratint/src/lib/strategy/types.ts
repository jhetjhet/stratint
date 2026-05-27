export type SOAP = {
  vision: string;
  mission: string;
  goals: string[];
  objectives: string[];
};

export type ThreeHorizon = {
  goals_12_months: string[];
  goals_24_months: string[];
  goals_36_months: string[];
};

export type BSCRow = {
  objective: string;
  performance_measure_target: string;
  rag_status: "" | "red" | "amber" | "green";
  lead: string;
};

export type BSCPerspectiveBlock = {
  perspective: string;
  rows: BSCRow[];
};

export type BalancedScorecard = {
  financial: BSCPerspectiveBlock;
  customers_partners: BSCPerspectiveBlock;
  systems_processes: BSCPerspectiveBlock;
  learning_growth: BSCPerspectiveBlock;
};

export type StepOneResult = {
  soap: SOAP;
  three_horizon_model: ThreeHorizon;
};

export type StepTwoResult = {
  balanced_scorecard: BalancedScorecard;
};
