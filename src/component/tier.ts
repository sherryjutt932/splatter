export enum Tier {
	Basic = 0,
	Silver = 1,
	Gold = 2,
	Diamond = 3
}

export function getValueTier(value: number): Tier {
	return value >= 2.0
		? Tier.Diamond
		: value >= 1.5
			? Tier.Gold
			: value >= 1
				? Tier.Silver
				: Tier.Basic;
}
