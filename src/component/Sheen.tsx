'use client';
import React from 'react';
import classes from './cssUtility';
import { Tier, getValueTier } from './tier';

export const COLORS: Record<string, string[]> = {
	'--color-tier-50':  [ '#6C63A9', '#D7E1F0', '#FEEDB0', '#ffffff' ],     // border-high
	'--color-tier-100': [ '#e7d4fa', '#D7E1F0', '#FEF3CD', '#C5EEFD' ],     // text-bright
	'--color-tier-200': [ '#d1baf9', '#BDCEE4', '#FEEDB0', '#A9D0FF' ],   // text-dim
	'--color-tier-500': [ '#8062b3', '#A8C4ED', '#E5BD1A', '#5CDCF7' ],     // border-mid
	'--color-tier-700': [ '#683f96', '#6b66b4', '#B84565', '#386ED0' ],     // border-dark
	'--color-tier-800': [ '#31214f', '#3E315B', '#403151', '#35325C' ],     // background
	'--color-tier-sheen': [ '#7e52d120', '#D7E1F014', '#FFF26719', '#5CDCF722' ], // sheen
}


interface Props {
	tier?: Tier;
	value: number;
	leftSheen?: number;
	rightSheen?: number;
	className?: string;
	outerClassName?: string;
	innerClassName?: string;
	children?: React.ReactNode | React.ReactNode[];
	style?: Record<string, number>;
}

export function Sheen(props: Props) {
	const tier = props.value ? getValueTier(props.value) : props.tier ?? Tier.Basic;

	return (
		<div
			className={classes('relative rounded-md rounded-br-2xl rounded-tl-2xl',
				props.className)}
			style={{
				...Object.fromEntries(Object.entries(COLORS).map(([ k, v ]) => [ k, v[tier] ])),
				...{ '--left-sheen': props.leftSheen ?? 0.7, '--right-sheen': props.rightSheen ?? 0.7 } as Record<string, number>,
				...props.style
			}}
		>
			{/** Background */}
			<div
				className={classes('absolute inset-0 rounded-md rounded-br-2xl rounded-tl-2xl pointer-events-none rounded-md rounded-br-2xl rounded-tl-2xl border-2 border-transparent z-10', props.outerClassName)}
				style={{
					boxShadow: `inset 0px 0px 12px color-mix(in srgb, var(--color-tier-500), transparent 60%), 0px 2px 8px color-mix(in srgb, var(--color-tier-500), transparent 60%)`,
					backgroundImage: `
						linear-gradient(var(--color-tier-800), var(--color-tier-800)),
						linear-gradient(35deg, transparent, transparent 10%, var(--color-tier-700) 30%, var(--color-tier-700) 70%, transparent 90%, transparent),
						linear-gradient(35deg,
							var(--color-tier-50), var(--color-tier-50) 8%, var(--color-tier-500) 8.5%,
							var(--color-tier-500) 12%, var(--color-tier-50) 12.5%, var(--color-tier-50) 21.5%, var(--color-tier-500) 22%,
							var(--color-tier-500) 78%, var(--color-tier-50) 78.5%, var(--color-tier-50) 90.5%, var(--color-tier-500) 91%,
							var(--color-tier-500) 93%, var(--color-tier-50) 93.5%)`,
					backgroundOrigin: 'border-box',
					backgroundClip: 'padding-box, border-box, border-box',
				}}
			/>

			{/* Children */}
			<div className={classes('relative z-30 overflow-hidden rounded-md rounded-br-2xl rounded-tl-2xl grid', props.innerClassName)}>
				{props.children}
			</div>

			{/* Sheen */}
			<div
				className={classes('absolute inset-0 rounded-md rounded-br-2xl rounded-tl-2xl pointer-events-none z-50', props.outerClassName)}
				style={{
					backgroundImage: `
						linear-gradient(35deg,
							var(--color-tier-sheen),
							color-mix(in srgb, var(--color-tier-sheen), calc(30% * (4 - var(--left-sheen) * 4)) transparent) 8%,
							transparent 8.5%,
							transparent 12%,
							color-mix(in srgb, var(--color-tier-sheen), calc(45% * (4 - var(--left-sheen) * 4)) transparent) 12.5%,
							color-mix(in srgb, var(--color-tier-sheen), calc(85% * (4 - var(--left-sheen) * 4)) transparent) 21.5%,
							transparent 22%,
							transparent 78%,
							color-mix(in srgb, var(--color-tier-sheen), calc(85% * (4 - var(--right-sheen) * 4)) transparent) 78.5%,
							color-mix(in srgb, var(--color-tier-sheen), calc(55% * (4 - var(--right-sheen) * 4)) transparent) 90.5%,
							transparent 91%,
							transparent 93%,
							color-mix(in srgb, var(--color-tier-sheen), calc(30% * (4 - var(--right-sheen) * 4)) transparent) 93.5%,
							color-mix(in srgb, var(--color-tier-sheen), calc(0% * (4 - var(--right-sheen) * 4)) transparent))`,
					backgroundOrigin: 'border-box',
					backgroundClip: 'border-box',
				}}
			/>
		</div>
	);
}
