
from pydantic import BaseModel, Field
from typing import List

class BSCRow(BaseModel):
    objective: str = Field(..., description="The strategic outcome being pursued.")
    performance_measure_target: str = Field(..., description="The metric used to track progress and desired level or result for the measure.")
    rag_status: str = Field("", description="Red-Amber-Green progress indicator. Leave blank for user input.")
    lead: str = Field("", description="The person responsible for execution. Leave blank for user input.")

class BSCPerspective(BaseModel):
    perspective: str = Field(..., description="The BSC perspective (e.g., Financial, Customers & Partners, etc.).")
    rows: List[BSCRow] = Field(
        ...,
        description="Up to four rows per perspective.",
        min_items=1,
        max_items=4,
    )

class BSCSchema(BaseModel):
    financial: BSCPerspective = Field(..., description="Financial perspective.")
    customers_partners: BSCPerspective = Field(..., description="Customers & Partners perspective.")
    systems_processes: BSCPerspective = Field(..., description="Systems & Processes perspective.")
    learning_growth: BSCPerspective = Field(..., description="Learning & Growth perspective.")

class Step2Response(BaseModel):
    balanced_scorecard: BSCSchema = Field(..., description="Balanced Scorecard (BSC) framework.")
