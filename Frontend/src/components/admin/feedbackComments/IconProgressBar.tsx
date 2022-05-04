import React, { useState, useEffect } from 'react';
import {
	Box,
	Typography,
	LinearProgress,
	LinearProgressProps,
} from '@material-ui/core';

function LinearProgressWithLabel(
	props: LinearProgressProps & { value: number },
) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<LinearProgress variant='determinate' {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant='body2'>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

interface progressProps {
  counter?: number;
  total?: number;
}

export default function LinearWithValueLabel({ counter, total }: progressProps) {
  const [progress, setProgress] = useState(10);

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((prevProgress: any) =>
				prevProgress >= 100 ? 10 : prevProgress + 10,
			);
		}, 800);
		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<Box
			sx={{
				padding: '15px',
				width: '100%',
				height: '100%',
				borderRadius: '10px',
				bgcolor: 'white',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				// alignItems: 'center',
			}}
		>
			<Typography
				style={{
					textAlign: 'center',
					fontWeight: 500,
					fontSize: '25px',
					color: '#7A7A7A',
				}}
			>
				Exporting data...
			</Typography>
			<LinearProgressWithLabel value={progress} />
		</Box>
	);
}
