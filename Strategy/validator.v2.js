// 显示错误提示
// dom => id => input.id + '-error'
function showError(dom, errorMsg){
	var id = dom.id;

	if(!dom.errorBox) dom.errorBox = document.getElementById(id + '-error');
	if(errorMsg){
		dom.errorBox.innerHTML = errorMsg;
		dom.errorBox.style.display = 'block';
	}else{
		dom.errorBox.innerHTML = '';
		dom.errorBox.style.display = 'none';
	}
}