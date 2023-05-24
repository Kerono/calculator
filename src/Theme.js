export default function Theme(props){
	const {onClick,themeOn} = props
	if(themeOn){
		document.body.classList.add("grayTheme")
	} else {
		document.body.classList.remove("grayTheme")
	}
	return (
				<div className = "theme" onClick={onClick}>Change theme</div>
	)
}
