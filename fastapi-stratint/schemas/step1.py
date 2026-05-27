from pydantic import BaseModel, Field
from typing import List

class SOAPSchema(BaseModel):
    vision: str = Field(..., description="The desired future state of the organisation.")
    mission: str = Field(..., description="The core purpose and what the organisation exists to do.")
    goals: List[str] = Field(
        ...,
        description="Major outcomes the organisation wants to achieve.",
        min_items=2,
        max_items=3,
    )
    objectives: List[str] = Field(
        ...,
        description="Specific, actionable statements that break down the goals.",
        min_items=3,
        max_items=4,
    )

class ThreeHorizonModelSchema(BaseModel):
    goals_12_months: List[str] = Field(
        ...,
        alias="goals_12_months",
        description="Short-term priorities for the next year.",
        min_items=1,
    )
    goals_24_months: List[str] = Field(
        ...,
        alias="goals_24_months",
        description="Mid-term priorities for the following two years.",
        min_items=1,
    )
    goals_36_months: List[str] = Field(
        ...,
        alias="goals_36_months",
        description="Longer-term priorities for the three-year horizon.",
        min_items=1,
    )

class Step1Response(BaseModel):
    soap: SOAPSchema = Field(..., description="Strategy-On-A-Page (SOAP) framework.")
    three_horizon_model: ThreeHorizonModelSchema = Field(..., description="3-Horizon Model (3HM) framework.")
