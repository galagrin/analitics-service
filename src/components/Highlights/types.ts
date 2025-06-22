export type AggregatedResult = {
    total_spend_galactic: number;
    less_spent_civ: string;
    rows_affected: number;
    big_spent_at: number;
    less_spent_at: number;
    big_spent_value: number;
    big_spent_civ: string;
    average_spend_galactic: number;
};

export type HighlightsProps = {
    aggregatedResult: AggregatedResult;
    isModal?: boolean;
};
