import './App.css';
import React, { useState } from "react"
import {NumberButton} from "./NumberButton"
import Theme from "./Theme"
export default function App() {
	const [expression, setExpression] = useState<Array<number | string>>([]);
	const [sum, setSum] = useState("0")
	const [theme, setTheme] = useState(false)
	function numberClick(n: number) {
		setExpression(expr => {
			let last = expr.at(-1);

			if (last === undefined) {
				return [n];
			}
			
			const rest = expr.slice(0, -1);
			// Если до этого был введён оператор
			if (typeof last === 'string' && last.includes(".") === false) {
				return [...expr, n];
			}
			
			last = Number(last + '' + n);
			
			return [...rest, last];
		});
	}
	
	function operationClick(o: string) {
		if (expression.length === 0) return;
		
		const lastExpression = expression.at(-1);
		if (typeof lastExpression === "string" && lastExpression.includes(".")) return 
		if (typeof lastExpression === 'number') {
			setExpression(expr => [...expr, o]);
		} else {
			setExpression(expr => {
				const rest = expr.slice(0, -1);
				
				return [...rest, o];
			});
		}
	}
	
	function clear(){
		setExpression([])
		setSum("0")
	}
	
	function deliteLastNumber(){
		if (expression.length === 0) return;
		
		setExpression(expr => {
			let last = String(expr.at(-1));
			const rest = expr.slice(0, -1);
			
			if (last.length === 1) {
				return rest;
			}
			
			last = last.substring(0, last.length - 1);
			return [...rest, Number(last)];
			
		})
	}
	function countSum(){
		setSum(eval(expression.join('')) || 0)
	}
	function changeTheme(){
		setTheme(prevValue=> {
			return !prevValue
		})
	}
	function addDot() {
		let last = expression.at(-1);
		if (expression.length === 0 
				|| typeof last === "string" 
				|| last?.toString().includes(".")) return
		setExpression(expt => {
			const rest = expt.slice(0, -1);
			last = last + "."
			return [...rest, last]
		})
	}
	return (
	 <div className={theme?"wrapper darkTheme":"wrapper"}>
		<Theme themeOn= {theme} onClick = {changeTheme}/>
		<div className="calculations">
			<div className='expression'>{expression.join('')}</div>
			<div className='sum'>{sum}</div>
		</div>
		<div className="keyboard">
			<div className="button" onClick={clear}>
				CL
			</div>
			<div className="button" onClick={deliteLastNumber}>
				<img src="/assets/backspace.svg" alt= "back"/>
			</div>
			<div className="button" onClick={() => operationClick('/')}>
				/
			</div>
			<div className="button" onClick={() => operationClick('*')}>
				*
			</div>
			<NumberButton number={7} onClick={numberClick} />
			<NumberButton number={8} onClick={numberClick} />
			<NumberButton number={9} onClick={numberClick} />
			<div className="button" onClick={() => operationClick('-')}>
				-
			</div>
			<NumberButton number={4} onClick={numberClick} />
			<NumberButton number={5} onClick={numberClick} />
			<NumberButton number={6} onClick={numberClick} />
			<div className="button" onClick={() => operationClick('+')}>
				+
			</div>
			<NumberButton number={1} onClick={numberClick} />
			<NumberButton number={2} onClick={numberClick} />
			<NumberButton number={3} onClick={numberClick} />
			<div className="button high" onClick={countSum}>
				=
			</div>
			<NumberButton number={0} isWide onClick={numberClick} />
			<div className="button" onClick={addDot}>
				.
			</div>
		</div>
	 </div>
  );
}
