var Desktop = function() {
	this.dom = document.querySelectorAll('.desktop');
	this.dom2 = document.querySelectorAll('.description');
	this.icons = [];
	this.activeWindows = [];

	this._initialize();
};

var _ = Desktop.prototype;

_._initialize = function() {
	this._bindEvents();
};

_._bindEvents = function() {
	var that = this;

	this.dom2[0].querySelectorAll('.createFolder')[0].onclick = function() {
		that.icons.push(new Icon(that, true));
	};

	this.dom2[0].querySelectorAll('.createIcon')[0].onclick = function() {
		that.icons.push(new Icon(that, false));
	};
};

_.openWindow = function(icon) {
	this.activeWindows.push(new Window(this, icon));
};

// _.closeWindow = function(window) {
// 	this.desktop.dom[0].removeChild(window);
// }

var Icon = function(desktop, isFolder) {
	this.desktop = desktop;
	this.dom = null;
	this.isFolder = isFolder;

	this._initialize();
};

_ = Icon.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
};

_._setDom = function() {
	this.dom = document.createElement("img");
	this.dom.className = 'icon';
	if(this.isFolder) {
		this.dom.src = './folder.png';
	} else {
		this.dom.src = './search.png';
	}
	this.desktop.dom[0].appendChild(this.dom);
};

_._bindEvents = function() {
	var that = this;

	this.dom.ondblclick = function() {
		if(that.isFolder) {
			that.desktop.openWindow(that);
		}
	};

	this.dom.onmousedown = function() {
		var self = this;
		this.onmousemove = function(e) {
			self.style.left = e.pageX - 25 + 'px';
			self.style.top = e.pageY - 25 + 'px';
		}
		self.onmouseup = function() {
			self.onmousemove = null;
		}
	};

	this.dom.ondragstart = function() { 
		return false
	};
};



var Window = function(desktop, icon) {
	this.desktop = desktop;
	this.icon = icon;
	this.dom = null;

	this._initialize();
};

_ = Window.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
};

_._setDom = function() {
	this.dom = document.createElement("div");
	this.dom.className = 'window';

	this.dom.innerHTML = '<div class="title">New window</div><div class="resize"></div>'

	this.desktop.dom[0].appendChild(this.dom);
	// this.dom2 = document.querySelectorAll('.resize');
};

_._bindEvents = function() {
	var that = this;

	this.dom.ondblclick = function() {
		// that.desktop.closeWindow(this);
		that.desktop.dom[0].removeChild(this);
	};

	this.dom.onmousedown = function() {
		var self = this;

		this.onmousemove = function(e) {
			self.style.left = e.pageX - 25 + 'px';
			self.style.top = e.pageY - 25 + 'px';
		}
		self.onmouseup = function() {
			self.onmousemove = null;
		}
	};

	this.dom.ondragstart = function() { 
		return false
	};

// 	this.dom2[0].onmousedown = function() {
// 		console.log('push');

// 		this.onmousemove = function(e) {
// 			var res = that.dom;
// 			if(e.pageX > res.style.left + res.style.width - 5) {
// 				res.style.width = res.style.width + 10 + 'px';
// 				// res.style.height = res.style.height + 10 + 'px';
// 			} else {
// 				res.style.width = res.style.width - 10 + 'px';
// 			}
// 		}
// 		self.onmouseup = function() {
// 			self.onmousemove = null;
// 		}
// 	};

// 	this.dom2.ondragstart = function() { 
// 		console.log('drag');
// 		// return false
// 	};
};