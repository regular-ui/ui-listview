#### Test1

<div class="m-example"></div>

```xml
<listView value={value}>
    {#list list as item}
    <item value={item_index}>{item.course}</item>
    {/list}
</listView>
<button on-click={this.getList()}>getList</button>
<select multiple>
    {#list list as item}
    <option selected={item.selected}>{item.course}</option>
    {/list}
</select>
{value}
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        value: 2,
        list: [
            {course: '精通Javascript开发', org: '前端Funs', hits: 42371},
            {course: 'Android深入浅出', org: 'Android学院', hits: 30645, selected: true},
            {course: 'cocos2dx游戏开发教程', org: '鱼C课程', hits: 25112},
            {course: 'MySQL数据库', org: 'LAMP兄弟连', hits: 18089, selected: true},
            {course: 'Arduino初级教程', org: '硬件社', hits: 16361},
        ]
    },
    getList: function() {
        this.data.list = [
            {course: 'Test1'},
            {course: 'Test2'},
            {course: 'Test3', selected: true},
        ]
        this.data.value = 2;
    }
});
```

#### Test1

<div class="m-example"></div>

```xml
<listView>
    {#list list as item}
    <item>{item.course}</item>
    {/list}
</listView>
<button on-click={this.getList()}>getList</button>
<select multiple>
    {#list list as item}
    <option selected={item.selected}>{item.course}</option>
    {/list}
</select>
{value}
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        list: [
            {course: '精通Javascript开发', org: '前端Funs', hits: 42371},
            {course: 'Android深入浅出', org: 'Android学院', hits: 30645, selected: true},
            {course: 'cocos2dx游戏开发教程', org: '鱼C课程', hits: 25112},
            {course: 'MySQL数据库', org: 'LAMP兄弟连', hits: 18089, selected: true},
            {course: 'Arduino初级教程', org: '硬件社', hits: 16361},
        ]
    },
    getList: function() {
        /* this.data.list = [
            {course: 'Test1'},
            {course: 'Test2'},
            {course: 'Test3', selected: true},
        ]*/
        this.data.list.push({course: 'test'})
    }
});
```

#### Test2

<div class="m-example"></div>

```xml
<listView value={value}>
    {#list list as item}
    <item value={item_index}>{item.course}</item>
    {/list}
</listView>
{value}
<button on-click={this.getList()}>getList</button>
```

```javascript
var component = new RGUI.Component({
    template: template,
    data: {
        list: []
    },
    getList: function() {
        this.data.list = [
            {course: 'Test1'},
            {course: 'Test2'},
            {course: 'Test3', selected: true},
        ];
        this.data.value = 2;
    }
});
```

#### select

<div class="m-example"></div>

```xml
<select value=1>
    <option value=2>Test2</option>
    <option value=3>Test1</option>
    <option value=5>Test2</option>
    <option value=6 selected>Test3</option>
</select>
```
