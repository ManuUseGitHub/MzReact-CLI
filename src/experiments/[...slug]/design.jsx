import "./style.scss";
import { useClassPrefix } from "mazeof-react/dist/hooks";

export const Design = ({ prefix }) => {
	const pre = useClassPrefix(prefix);

	return (
		<div className={pre(`feat feat-light`)}>
			<h1>Your "Docs" Component is ready !</h1>
		</div>
	);
};