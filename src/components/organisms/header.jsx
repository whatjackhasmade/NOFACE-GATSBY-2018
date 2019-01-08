import React, { Component } from "react";
import { graphql, Link, StaticQuery } from "gatsby";
import styled from "styled-components";

import {
	autoParagraph,
	decodeHTML,
	flattenSlug,
	httpTohttps,
	removeDimensions,
	removeOrphans,
	slugTitle
} from "../helpers";

import Logo from "../atoms/logo";

import HeaderNavigation from "../molecules/headerNavigation";

const HeaderComponent = styled.header`
	width: 100%;
	z-index: 101;

	background-color: ${props => props.theme.white};
	box-shadow: 0px 1px 6px ${props => props.theme.shadowColour};
	font-weight: 400;

	h5 {
		display: none;
	}

	.header__contents {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 16px;

		max-width: 1920px;
		width: 80%;
		margin: 0 auto;

		@media (min-width: 768px) {
			flex-direction: row;
			padding: 16px 32px;
		}
	}

	.logo {
		min-width: 50px;
		position: relative;
		width: 50px;

		&__path {
			animation-duration: 1s;
			animation-iteration-count: 1;
			animation-name: draw;
			animation-timing-function: linear;
			animation-timing-function: ease;

			animation-fill-mode: forwards;
			fill: none;
			stroke: ${props => props.theme.black};
			stroke-dasharray: 142.47500610351562px;
			stroke-dashoffset: 142.47500610351562px;
			stroke-linecap: round;
			stroke-miterlimit: 10;
			stroke-width: 10;
		}
	}

	@keyframes draw {
		to {
			stroke-dashoffset: 0;
		}
	}
`;

export default class header extends Component {
	render() {
		return (
			<StaticQuery
				query={graphql`
					query GetHeaderContent {
						allNoFaceMenu {
							edges {
								node {
									id
									slug
									content {
										item_id
										title
										url
									}
								}
							}
						}
					}
				`}
				render={data => (
					<HeaderComponent>
						<div className="header__contents">
							<div className="logo">
								<Link to="/">
									<Logo />
									<h5 className="hide">NoFace Designs</h5>
								</Link>
							</div>

							{data.allNoFaceMenu.edges.map((data, i) =>
								data.node.slug == "header-menu" ? (
									<HeaderNavigation key={i} data={data.node} />
								) : null
							)}
						</div>
					</HeaderComponent>
				)}
			/>
		);
	}
}
