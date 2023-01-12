# 第一章 装饰器

## 1.什么是装饰器

装饰器是一种特殊的类型声明，可以附加在类、方法、属性、参数上面，通过@符号添加装饰器

## 2.类装饰器

它会自动将class的构造函数传入到装饰器的第一个参数target，通过prototype去自定义添加属性和方法

~~~javascript
function decorator(target:any){
    target.prototype.name = "lisi"
}

@decorator
class Lisi{
    constructor(){}
}

const list:any = new Lisi()
console.log(list.name)
~~~

## 3.属性装饰器

它会获取两个参数

1. 原型对象
2. 属性的名称

~~~javascript
function propertyDecorator:PropertyDecorator(target:any,key:string|symbol){
    
}

class Lisi{
    @propertyDecorator public name:string
    constructor(){
        this.name = ""
    }
	getName(){
		return this.name
    }
}
~~~

## 4.参数装饰器

它会获取三个参数

1. 原型对象
2. 方法的名称
3. 参数的位置

~~~javascript
function paramDecorator:ParameterDecorator(target:any,key:string|symbol,index:number){

}

class Lisi{
    public name:string
    constructor(){
        this.name = ""
    }
	getName(name:string,@paramDecorator age:number){
        return this.name
    }
}
~~~

## 5.方法装饰器

它会获取三个参数

1. 原型对象
2. 方法的名称
3. 属性描述符 writable-可写 enumerable-可枚举 configurable-可配置

~~~javascript
function methodDecorator:MethodDecorator(target:any,key:string|symbol,descriptor:any){
	
}

class Lisi{
    pubic name:string
    constructor(){
        this.name = ""
    }
	@methodDecorator
	getName(name:string,age:nuumber){
        return this..name
    }
}
~~~

