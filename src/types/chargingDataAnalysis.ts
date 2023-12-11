export interface dataAnalysisType {
  name: string;
  totalPercentage: number;
  data: dataType[];
}
export interface dataType {
  id: number;
  name?: string;
  percentage?: string;
}
