let musicData = [
	["F","E","Am","Am","F","E","Am","Am"],	//グッバイ宣言 丸サ進行
	["C","G","Am","G","F","C","F","G","C"],	//マリーゴールド カノン進行
	["Am","F","G","C","Am","F","G","C"],	//千本桜 小室進行
	["F","G","Em","Am","Dm","C","A#","G"],	//Love so sweet 王道進行
];
let chainData = {};
onload = function(){
	chainData = createChainData(musicData);


	const create = document.getElementById("createMusic");
	let code = [];
	create.onclick = () => {
		const long = document.getElementById("long").value;
		if(isNaN(long) || long < 1){
			alert("小節数には1以上の整数を入力してください");
			return;
		}
		if(long > 64){
			alert("小節数は64小節以下にしてください。");
			return;
		}
		if(long !== parseInt(long)){
			document.getElementById("long").value = parseInt(long);
		}
		code = createSong(parseInt(long));
		displaySong(code);
	};

	function createChainData(data){
		let ar = [];
		for(let i = 0;i < data.length;i++){
			for(let j = 1;j < data[i].length;j++){
				console.log(data[i][j - 1],"->",data[i][j]);
				if(!ar[data[i][j - 1]]) ar[data[i][j - 1]] = {};
				if(!ar[data[i][j - 1]][data[i][j]]){
					ar[data[i][j - 1]][data[i][j]] = 1;
				}else{
					ar[data[i][j - 1]][data[i][j]] += 1;
				}
				console.log(ar[data[i][j - 1]]);
			}
		}
		return ar;
	}

	function createSong(long){
		let a = [];
		const c = Object.keys(chainData);
		a.push(c[parseInt(Math.random() * c.length)]);
		while(a.length < long){
			const beforeCode = a[a.length - 1];
			const nexts = chainData[beforeCode];
			console.log(beforeCode,nexts);
			const values = Object.values(nexts);
			const keys = Object.keys(nexts);
			const sum = values.reduce((s, e) => s + e, 0);
			console.log(sum,values,keys)
			let random = parseInt(Math.random() * sum);
			let nextCode = ""
			for(let i = 0;i < values.length;i++){
				if(random < values[i]){
					nextCode = keys[i];
					break;
				}
				random -= values[i];
			}
			a.push(nextCode);
		}
		return a;
	}
	function displaySong(data){
		const r = document.getElementById("result");
		let str = "";
		for(const [index,i] of data.entries()){
			str += `|<span class="code code${index}">${i}</span>`;
		}
		r.innerHTML = str.slice(1);	//最初のバーを削除
	}
};
