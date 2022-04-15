import { Paper, Input, IconButton, Divider, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';

interface IProps {
	onSearch: Function;
	clearSearch: Function;
	style: Object;
	searchInitiated: boolean;
	default: string;
}

const SearchField = (props: IProps) => {
	const { searchInitiated } = props;
	const [keyword, setKeyword] = useState(() => {
		if (props.default) return props.default;
		return '';
	});

	const handleTyping = (e: any) => {
		setKeyword(e.target.value);
	};

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			setKeyword(keyword);
			props.onSearch(keyword);
			e.preventDefault();
		}
	};

	const handleClear = () => {
		props.clearSearch();
	};

	const handleSearchInit = () => {
		if (props.onSearch) {
			props.onSearch(keyword);
		}
	};

	return (
		<div key='searchFieldInside' style={props.style}>
			<div
				key='searchFieldStyleDiv'
				style={{
					padding: '6px 6px',
					display: 'flex',
					alignItems: 'center',
					width: '100%',
					height: '100%',
					marginLeft: 'auto',
					borderRadius: '14px',
				}}
			>
				<Input
					key='searchFieldInput'
					style={{ marginLeft: 1, flex: 1, width: '90%'}}
					placeholder='Search'
					value={keyword}
					inputProps={{ 'aria-label': 'search', }}
					disableUnderline={true}
					onChange={handleTyping}
					onKeyPress={handleKeyPress}
				/>
				{searchInitiated ? (
					<IconButton
						type='button'
						key='searchFieldClearIconButton'
						style={{ padding: '10px' }}
						disableRipple={true}
						aria-label='cancel'
						onClick={handleClear}
					>
						<ClearIcon key='searchFieldClearIcon' />
					</IconButton>
				) : (
					<div />
				)}
				<Divider style={{ height: 28, marginLeft: 5 }} orientation='vertical' />
				<Tooltip title="click to start search" arrow>
				<IconButton
					type='button'
					key='searchFieldSearchIconButton'
					style={{ padding: '10px' }}
					disableRipple={true}
					aria-label='search'
					onClick={handleSearchInit}
				>
					<SearchIcon key='searchFieldSearchIcon' />
					</IconButton>
					</Tooltip>
			</div>
		</div>
	);
};

export default SearchField;
