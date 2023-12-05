# VUE 3.0

[vue官方中文文档](https://cn.vuejs.org/)

## 一.composition API

### 1.setup

setup函数是一个新的组件选项，作为组件内使用composition API的入口

~~~vue
<script setup lang="ts">
console.log("hello script setup");
</script>
~~~

### 2.响应式核心

- ref：可传入任意类型的值并返回一个响应式且可改变的ref对象。ref对象拥有一个指向内部值的单一属性`.value`,改变值的时候必须使用其value属性
- reactive：接受一个普通对象然后返回该普通对象的响应式代理

#### ref

~~~vue
<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

const count: Ref<number> = ref(0);
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
</script>
~~~

不需要深层次的响应，可以使用shallowRef()来代替

#### reactive

~~~vue
<script setup lang="ts">
import { reactive } from 'vue';

interface ObjType {
  count: number;
}

const obj: ObjType = reactive({ count: 0 });
obj.count++;
</script>
~~~

不需要深层次的响应，可以使用shallowReactive()来代替

#### computed

~~~vue
<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Ref } from 'vue';

const count: Ref<number> = ref(1);
// 只读的计算属性
const plusOne = computed<number>(() => count.value + 1);

// 可写的计算属性
let plusTwo = computed<number>({
  get() {
    return count.value + 1;
  },
  set(val) {
    count.value = val - 1;
  }
});

plusTwo.value = 5;
</script>
~~~

#### readonly

接收一个对象（不论是响应式还是普通的）或是一个ref，返回一个原值的只读代理

~~~vue
<script setup lang="ts">
import { reactive, readonly, watchEffect } from 'vue';

interface OriginalType {
  count: number;
}

const original: OriginalType = reactive({ count: 0 });
const copy = readonly(original);

watchEffect(() => {
  console.log(copy.count);
});

original.count++;
copy.count++; // 更改失败，触发警告
</script>
~~~

[shallowReadonly()](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly)

#### watchEffect()

立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行，返回值是一个用来停止该副作用的函数。

~~~vue
<script setup lang="ts">
import { ref, watchEffect, nextTick } from 'vue';

const count = ref(0);

const stop = watchEffect(() => console.log(count.value));
// -> 输出 0

count.value++;
// -> 输出 1

nextTick(() => {
  stop();
  count.value++; // 不再监听
});
</script>
~~~

#### watch

watch()接收的第一个参数被称作"数据源",它可以是：

- 一个返回任意值的getter函数
- 一个包装对象(可以是ref也可以是reactive包装的对象)
- 一个包含上述两种数据源的数组

1. 监听单个数据源

   ~~~js
   const state = reactive({count: 1});
   
   //侦听一个reactive定义的数据,修改count值时会触发 watch的回调
   watch(()=>state.count,(newCount,oldCount)=>{
     console.log('newCount:',newCount);  
     console.log('oldCount:',oldCount);
   })
   //侦听一个ref
   const num = ref(0);
   watch(num,(newNum,oldNum)=>{
     console.log('newNum:',newNum);  
     console.log('oldNum:',oldNum);
   })
   ~~~

2. 侦听多个数据源(数组)

   ~~~js
   const state = reactive({count: 1});
   const num = ref(0);
   // 监听一个数组
   watch([()=>state.count,num],([newCount,newNum],[oldCount,oldNum])=>{
     console.log('new:',newCount,newNum);
     console.log('old:',oldCount,oldNum);
   })
   ~~~

3. 侦听复杂的嵌套对象

   ~~~js
   const state = reactive({
     person: {
       name: '坤哥',
       fav: ['basketball','chicken','music']
     },
   });
   watch(
     () => state.person,
     (newType, oldType) => {
       console.log("新值:", newType, "老值:", oldType);
     },
     { deep: true }, // 立即监听
   );
   ~~~

### 3.响应式工具

1. isRef()：检查某个值是否为 ref

2. unRef：如果参数是 ref，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 计算的一个语法糖。

3. toRef()：可以将值、refs 或 getters 规范化为 refs (3.3+)，也可以基于响应式对象上的一个属性，创建一个对应的 ref

   ~~~js
   const state = reactive({
     foo: 1,
     bar: 2
   })
   
   // 双向 ref，会与源属性同步
   const fooRef = toRef(state, 'foo')
   
   // 更改该 ref 会更新源属性
   fooRef.value++
   console.log(state.foo) // 2
   
   // 更改源属性也会更新该 ref
   state.foo++
   console.log(fooRef.value) // 3
   ~~~

4. toValue()（3.3+）：将值、refs 或 getters 规范化为值。这与 [unref()](https://cn.vuejs.org/api/reactivity-utilities.html#unref) 类似，不同的是此函数也会规范化 getter 函数。如果参数是一个 getter，它将会被调用并且返回它的返回值。

5. toRefs()：将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 [`toRef()`](https://cn.vuejs.org/api/reactivity-utilities.html#toref) 创建的。

6. isProxy()：检查一个对象是否是由 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive)、[`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly)、[`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 或 [`shallowReadonly()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly) 创建的代理。

7. isReactive()：检查一个对象是否是由 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive) 或 [`shallowReactive()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreactive) 创建的代理。

8. isReadonly()：检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值。通过 [`readonly()`](https://cn.vuejs.org/api/reactivity-core.html#readonly) 和 [`shallowReadonly()`](https://cn.vuejs.org/api/reactivity-advanced.html#shallowreadonly) 创建的代理都是只读的，因为他们是没有 `set` 函数的 [`computed()`](https://cn.vuejs.org/api/reactivity-core.html#computed) ref。

### 4.生命周期

![组件生命周期图示](https://cn.vuejs.org/assets/lifecycle.16e4c08e.png)

~~~vue
<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeMount,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue';

// 初始化数据阶段的生命周期，介于beforeCreate和created之间
const a = ref(0);
function handleClick() {
  a.value += 1;
}
onBeforeMount(() => {
  console.log('组件挂载之前');
});
onMounted(() => {
  console.log('DOM挂载完成');
});
onBeforeUpdate(() => {
  console.log('DOM更新之前', document.getElementById('test')!.innerHTML);
});
onUpdated(() => {
  console.log('DOM更新完成', document.getElementById('test')!.innerHTML);
});
onBeforeUnmount(() => {
  console.log('实例卸载之前');
});
onUnmounted(() => {
  console.log('实例卸载之后');
});
</script>

<template>
  <div id="test" @click="handleClick">{{ a }}</div>
</template>
~~~

### 5.依赖注入

#### Provide (提供)

~~~vue
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
~~~

#### 应用层 Provide

~~~vue
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
~~~

#### Inject (注入)

~~~vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
~~~

#### 6.模板引用refs

~~~vue
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
~~~

### 7.组件通信

- defineProps & defineEmits

  使用typescript

  ~~~vue
  <script setup lang="ts">
  defineProps<{
    title?: string
    likes?: number
  }>()
  </script>
  ~~~

  ~~~vue
  <script setup>
  const props = defineProps({
    foo: String
  })
  
  const emit = defineEmits(['change', 'delete'])
  </script>
  ~~~

- v-model

- provide & inject

- defineExpose & ref

  使用 `<script setup>` 的组件是**默认关闭**的——即通过模板引用或者 `$parent` 链获取到的组件的公开实例，**不会**暴露任何在 `<script setup>` 中声明的绑定。

  可以通过 `defineExpose` 编译器宏来显式指定在 `<script setup>` 组件中要暴露出去的属性

  ~~~vue
  <script setup>
  import { ref } from 'vue'
  
  const a = 1
  const b = ref(2)
  
  defineExpose({
    a,
    b
  })
  </script>
  ~~~

- pinia

### 8.Teleport

它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去。

`<Teleport>` 接收一个 `to` prop 来指定传送的目标。

~~~vue
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
~~~

### 9.Supense

> 是一项实验性功能。它不一定会最终成为稳定功能，并且在稳定之前相关 API 也可能会发生变化。

自带两个 `slot` 分别为 `default、fallback`。当要加载的组件不满足状态时,`Suspense` 将回退到 `fallback`状态一直到加载的组件满足条件，才会进行渲染。

~~~vue
<Suspense>
  <!-- 具有深层异步依赖的组件 -->
  <Dashboard />

  <!-- 在 #fallback 插槽中显示 “正在加载中” -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
~~~

### 10.Transition

- v-enter->v-enter-from
- v-leave->v-leave-from

~~~vue
<button @click="show = !show">Toggle</button>
<Transition>
  <p v-if="show">hello</p>
</Transition>
~~~

~~~vue
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
~~~

### 11.Slot

具名插槽`slot`和作用域插槽`slot-scope`合并为`v-slot`

~~~vue
<!-- 父组件中使用 -->
 <template v-slot:content="scoped">
   <div v-for="item in scoped.data">{{item}}</div>
</template>

<!-- 也可以简写成： -->
<template #content="{data}">
    <div v-for="item in data">{{item}}</div>
</template>
~~~

### 12.v-model

在2.0`v-model`必须使用`value`的prop，并且只能使用一个`v-model`，对于数据传递只能使用自定义属性和事件

~~~js
<ChildComponent v-model="pageTitle" />

<!-- 简写: -->

<ChildComponent
  :modelValue="pageTitle"
  @update:modelValue="pageTitle = $event"
/>
~~~

### 13.自定义指令

API 已重命名，以便更好地与组件生命周期保持一致

- bind → **beforeMount**
- inserted → **mounted**
- **beforeUpdate**:新的！这是在元素本身更新之前调用的，很像组件生命周期钩子
- update → 移除！有太多的相似之处要更新，所以这是多余的，请改用 `updated`
- componentUpdated → **updated**
- **beforeUnmount ** `新的`与组件生命周期钩子类似，它将在卸载元素之前调用。
- unbind -> **unmounted**

~~~vue
const app = createApp(App);
// 创建自定义指令
app.directive('highlight',{
  // 指令 也拥有一组生命周期钩子
  // 1.在绑定元素的父组件挂载之前调用
  beforeMount(el,binding,vnode){
    el.style.background = binding.value;
  },
})
~~~

