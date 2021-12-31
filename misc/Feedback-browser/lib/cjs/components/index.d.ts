/// <reference types="react" />
import './styles.css';
interface IButtonProps {
    label: string;
    productVersion: string;
    productKey: string;
    userName: string;
    categories: string[];
}
declare const FeedbackButtonComponent: (props: IButtonProps) => JSX.Element;
export default FeedbackButtonComponent;
