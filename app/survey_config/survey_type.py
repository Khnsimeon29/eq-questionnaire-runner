from enum import Enum


class SurveyType(Enum):
    BUSINESS = "business"
    SOCIAL = "social"
    DEFAULT = "default"
    HEALTH = "health"
    NORTHERN_IRELAND = "northernireland"
    BEIS = "beis"
    BEIS_NI = "beis-ni"
    ORR = "orr"
    CENSUS = "census"
    CENSUS_NISRA = "census-nisra"
