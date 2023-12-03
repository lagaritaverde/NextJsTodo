import styled from 'styled-components'

type TContainer = {
	justify?:
		| 'flex-start'
		| 'flex-end'
		| 'center'
		| 'space-around'
		| 'space-between'
		| 'space-evenly'
	direction?: 'column' | 'row'
	align?: 'stretch' | 'center' | 'start' | 'end' | 'baseline'
}

export const Container = styled.div<TContainer>`
	display: flex;
	flex-direction: column;
`
