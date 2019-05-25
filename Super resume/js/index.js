		// 导航
	layui.use('element', function(){
	  var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
	  
	  //监听导航点击
	  element.on('nav(demo)', function(elem){
		//console.log(elem)
		layer.msg(elem.text());
	  });
	});
	
// 客服
	layui.use('layer', function(){ //独立版的layer无需执行这一句
		var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
		
		//触发事件
		var active = {
			setTop: function(){
				var that = this; 
				//多窗口模式，层叠置顶
				layer.open({
					type: 2 //此处以iframe举例
					,title: '当你选择该窗体时，即会在最顶端'
					,area: ['390px', '260px']
					,shade: 0
					,maxmin: true
					,offset: [ //为了演示，随机坐标
						Math.random()*($(window).height()-300)
						,Math.random()*($(window).width()-390)
					] 
					,content: '//layer.layui.com/test/settop.html'
					,btn: ['继续弹出', '全部关闭'] //只是为了演示
					,yes: function(){
						$(that).click(); 
					}
					,btn2: function(){
						layer.closeAll();
					}
					
					,zIndex: layer.zIndex //重点1
					,success: function(layero){
						layer.setTop(layero); //重点2
					}
				});
			}
			,offset: function(othis){
				var type = othis.data('type')
				,text = othis.text();
				
				layer.open({
					type: 1
					,anim:2
					,offset: type //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
					,id: 'layerDemo'+type //防止重复弹出
					,content: '<div style="height: 300px; width: 150px; padding: 20px 100px;">'+ '<textarea style="height: 250px;"></textarea>' +'</div>'
					,btn: '发送'
					,btnAlign: 'c' //按钮居中
					,shade: 0 //不显示遮罩
					,yes: function(){
						layer.closeAll();
					}
				});
			}
		};
		
		$('#layerDemo .layui-btn').on('click', function(){
			var othis = $(this), method = othis.data('method');
			active[method] ? active[method].call(this, othis) : '';
		});
		
	});


// tab选项卡
	layui.use('element', function(){
		var $ = layui.jquery
		,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
		
		//触发事件
		var active = {
			tabAdd: function(){
				//新增一个Tab项
				element.tabAdd('demo', {
					title: '新选项'+ (Math.random()*1000|0) //用于演示
					,content: '内容'+ (Math.random()*1000|0)
					,id: new Date().getTime() //实际使用一般是规定好的id，这里以时间戳模拟下
				})
			}
			,tabDelete: function(othis){
				//删除指定Tab项
				element.tabDelete('demo', '44'); //删除：“商品管理”
				
				
				othis.addClass('layui-btn-disabled');
			}
			,tabChange: function(){
				//切换到指定Tab项
				element.tabChange('demo', '22'); //切换到：用户管理
			}
		};
		
		$('.site-demo-active').on('click', function(){
			var othis = $(this), type = othis.data('type');
			active[type] ? active[type].call(this, othis) : '';
		});
		
		//Hash地址的定位
		var layid = location.hash.replace(/^#test=/, '');
		element.tabChange('test', layid);
		
		element.on('tab(test)', function(elem){
			location.hash = 'test='+ $(this).attr('lay-id');
		});
		
	});