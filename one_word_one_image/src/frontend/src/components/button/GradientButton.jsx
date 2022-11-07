import React from "react";
import { Button } from "@mantine/core";
// import Link from "next/client";

const GradientButton = React.forwardRef(
	(
		{ gradientColor, children, marginLeft, marginRight, onClick, href, type, fullWidth, size, radius },
		ref
	) => {
		return (
			<Button
				component={type ? "button" : "a"}
				ref={ref}
				href={href}
				onClick={onClick}
				type={type}
				fullWidth={fullWidth}
				size={size}
				radius={radius}
				styles={{
					root: {
						background: gradientColor,
						boxShadow: "0px 10.2188px 20.4375px rgba(123, 66, 246, 0.15)",

						marginLeft: marginLeft || "",
						marginRight: marginRight || "",
						color: "white",
						fontFamily: "'Gilroy',sans-serif",
						fontWeight: 600,
						filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
						'&:hover': {
							backgroundColor: gradientColor,
						},
					},
				}}>
				{children}
			</Button>
		);
	}
);

export default GradientButton;
