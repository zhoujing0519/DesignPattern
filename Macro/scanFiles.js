// Folder
	var Folder = function(name){
		this.name = name; // 文件夹名称
		this.parent = null; // 保存对父节点的引用
		this.files = []; // 文件夹里的文件
	};

	// 添加文件（夹）
	Folder.prototype.add = function(file){
		file.parent = this; // 将该文件夹设为添加文件的父节点
		this.files.push(file);
	};

	// 扫描文件夹
	Folder.prototype.scan = function(){
		console.log('开始扫描文件夹：' + this.name);
		for(var i = 0, file, files = this.files; file = files[i++]; ) file.scan();
	};

	// 删除文件夹
	Folder.prototype.remove = function(){
		if(!this.parent) return; // 根节点或者树外的游离节点，不允许删除
		for(var files = this.parent.files, l = files.length - 1; l >= 0; l--){
			var file = files[l];
			if(file === this) files.splice(l, 1); // 遍历父节点中的文件列表，找到并移除自身
		}
	};

// File
	var File = function(name){
		this.name = name; // 文件名
		this.parent = null; // 初始化的时候是游离文件
	};

	// 添加文件，抛出异常
	File.prototype.add = function(){
		throw new Error('文件下面不能再添加文件！');
	};

	// 扫描文件
	File.prototype.scan = function(){
		console.log('开始扫描文件：' + this.name);
	};

	// 删除文件
	File.prototype.remove = function(){
		if(!this.parent) return; // 根节点或者树外的游离节点，不允许删除
		for(var files = this.parent.files, l = files.length - 1; l >= 0; l--){
			var file = files[l];
			if(file === this) files.splice(l, 1); // 遍历父节点中的文件列表，找到并移除自身
		}
	};

/*
	需求: 将H盘中的文件拷贝到F盘的'学习资料'文件夹
	F盘:
		F:\学习资料\JavaScript\'JavaScript设计模式与开发实践'.pdf
		F:\学习资料\jQuery\'精通jQuery'.pdf
		F:\学习资料\'重构与模式'.pdf
	H盘：
		H:\Nodejs\'深入浅出Node.js'.pdf
		H:\'JavaScript语言精髓与编程实践'.pdf
*/

	// F盘
	var folder = new Folder('学习资料'),
		folder1 = new Folder('JavaScript'),
		folder2 = new Folder('jQuery'),

		file1 = new File('JavaScript设计模式与开发实践.pdf'),
		file2 = new File('精通jQuery.pdf'),
		file3 = new File('重构与模式.pdf');

		folder1.add(file1);
		folder2.add(file2);

		folder.add(folder1);
		folder.add(folder2);
		folder.add(file3);

	// H盘
	var folder3 = new Folder('Nodejs'),

		file4 = new File('深入浅出Node.js.pdf'),
		file5 = new File('JavaScript语言精髓与编程实践.pdf');

		folder3.add(file4);

	// 拷贝
	folder.add(folder3);
	folder.add(file5);

	// 扫描F盘
	folder.scan();

	// 删除jQuery文件夹，再次扫描文件夹
	folder2.remove();
	folder.scan();
