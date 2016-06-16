## 案例
### 内存选择

<div class="m-example"></div>

```xml
<pills>
    <pill>1GB</pill>
    <pill>2GB</pill>
    <pill>4GB</pill>
    <pill disabled>8GB</pill>
    <pill disabled>16GB</pill>
</pills>
```

```javascript
RGUI.Pills = RGUI.ListView.extend({
    name: 'pills',
    template: '<ul class="m-pills {class}" z-dis={disabled} r-hide={!visible}>{#inc this.$body}</ul>'
});

RGUI.Pill = RGUI.Item.extend({
    name: 'pill'
});

let component = new RGUI.Component({
    template: template
});
```

```css
.m-pills {list-style: none; margin: 0; padding: 0; font-size: 0;}
.m-pills>li {
    box-sizing: border-box; display: inline-block;
    font-size: 14px; text-align: center; cursor: pointer;
    height: 32px; line-height: 32px; padding: 0 16px; margin-right: -1px;
    background: white; color: #999; border: 1px solid #67aaf5;
}
.m-pills>li:first-child {border-radius: 2px 0 0 2px;}
.m-pills>li:last-child {border-radius: 0 2px 2px 0;}
.m-pills>li.z-sel {position: relative; background: #67aaf5; color: #fff;}
.m-pills>li.z-dis {cursor: not-allowed; background-color: #f5f5f5; color: #ccc; border-color: #ccd5db;}
```

### 带宽/流量切换

<div class="m-example"></div>

```xml
<pills>
    <pill selected>带宽</pill>
    <pill>流量</pill>
</pills>
```

### 内存选择 - 升级版

<div class="m-example"></div>

```xml
<pills value={memoryPrice}>
    {#list flavors as flavor}
    <pill value={flavor.price} disabled={flavor.memory >= 8}>{flavor.memory}GB</pill>
    {/list}
</pills>
```

```javascript
let component = new RGUI.Component({
    template: template,
    data: {
        flavors: []
    },
    init() {
        setTimeout(() => {
            this.data.flavors = [
                {memory: 1, price: 0.23},
                {memory: 2, price: 0.52},
                {memory: 4, price: 0.93},
                {memory: 8, price: 1.86},
                {memory: 16, price: 3.60},
            ];
            this.data.memoryPrice = this.data.flavors[0].price;
            this.$update();
        }, 500);
    }
});
```

### 镜像选择

<div class="m-example"></div>

```xml
<repoCards>
    {#list repos as repo}
    <repoCard value={repo} />
    {/list}
</repoCards>
```

```javascript
RGUI.RepoCards = RGUI.ListView.extend({
    name: 'repoCards',
    template: '<div class="m-repoCards {class}" z-dis={disabled} r-hide={!visible}>{#inc this.$body}</div>'
});

RGUI.RepoCard = RGUI.Item.extend({
    name: 'repoCard',
    template: `
        <div class="u-repoCard {class}" z-sel={selected} z-dis={disabled} z-divider={divider} title={title} r-hide={!visible} on-click={this.select()}>
            <div class="repoCard_info">
                <div class="repoCard_logo"><i class="u-icon u-icon-html5"></i></div>
                <div class="repoCard_name">{value.name}</div>
            </div>
            <div class="repoCard_version">{value.version}</div>
        </div>
    ` 
});

let component = new RGUI.Component({
    template: template,
    data: {
        repos: [
            {name: 'centos', version: '6.5'},
            {name: 'ubuntu', version: '14.04'},
            {name: 'LAMP', version: 'latest'},
            {name: 'mysql', version: '5.6'},
            {name: 'redis', version: '2.8.4'},
        ]
    }
});
```

```css
.m-repoCards {font-size: 0;}
.u-repoCard {
    position: relative; display: inline-block; cursor: pointer;
    width: 100px; font-size: 14px; margin: 8px;
    background: #fff; color: #666; border: 1px solid #e9eff3;
    border-radius: 1px; transition: box-shadow 0.2s;
}
.u-repoCard .repoCard_info {background-color: #fff; border: 1px solid #fff; border-bottom: 0;}
.u-repoCard .repoCard_logo {margin: 12px 0 8px 0; height: 44px; text-align: center; font-size: 32px; color: #67aaf5;}
.u-repoCard .repoCard_name {
    padding: 0 10px; height: 26px; line-height: 26px; font-size: 14px; color: #333;
    text-align: center; overflow: hidden; word-wrap: normal; white-space: nowrap; text-overflow: ellipsis;
}
.u-repoCard .repoCard_version {
    position: relative; height: 28px; line-height: 28px; padding: 0 20px; background-color: #f4f8fa;
    text-align: center; overflow: hidden; word-wrap: normal; white-space: nowrap; text-overflow: ellipsis;
}
.u-repoCard:hover {box-shadow: 0 0 10px 0 rgba(80,90,109,0.24);}
.u-repoCard.z-sel {border-color: #67aaf5;}
.u-repoCard.z-sel .repoCard_info {border-color: #67aaf5;}
.u-repoCard.z-sel .repoCard_version {color: #fff; background-color: #67aaf5;}
```

### 镜像选择 - 升级版

<div class="m-example"></div>

```xml
<repoCards class="m-repoCards-complex">
    <div class="repoCards_tt">我的镜像 <a class="f-fr" on-click={showAll = !showAll}>{showAll ? '部分显示' : '全部显示(' + myRepos.length + ')'}</a></div>
    {#list myRepos as repo}
    <repoCard value={repo} visible={repo_index < 5 || showAll} />
    {/list}
    <div class="repoCards_tt">官方镜像</div>
    {#list repos as repo}
    <repoCard value={repo} />
    {/list}
</repoCards>
```

```javascript
let component = new RGUI.Component({
    template: template,
    data: {
        showAll: false,
        myRepos: [
            {name: '106807_test01', version: '3b3c06f7_20160419144110'},
            {name: '67572_testhttps', version: 'dd1c30a4_20160203133928'},
            {name: '66901_nnnn', version: '3b3c06f7_20160409125741'},
            {name: '66910_python', version: '350a95e3_20160316154903'},
            {name: '66911_tomcat', version: '290000b5_20160331204310'},
            {name: '66908_php', version: '290000b5_20160331204144'},
            {name: '87320_boot', version: '350a95e3_20160316154903'},
            {name: '66451_nodejs', version: '3b3c06f7_20160419144110'},
            {name: '64259_test', version: 'dd1c30a4_20160203133928'},
        ],
        repos: [
            {name: 'centos', version: '6.5'},
            {name: 'ubuntu', version: '14.04'},
            {name: 'LAMP', version: 'latest'},
            {name: 'mysql', version: '5.6'},
            {name: 'redis', version: '2.8.4'},
        ]
    }
});
```

```css
.m-repoCards-complex {width: 590px; padding: 0 20px; border: 1px solid #e1e8ed; border-radius: 1px;}
.m-repoCards .repoCards_tt {font-size: 14px; line-height: 20px; margin: 8px 8px 0;}
```

### 选择密钥

<div class="m-example"></div>

```xml
<sshKeys>
    {#list sshKeys as sshKey}
    <sshKey title={sshKey}>{sshKey}</sshKey>
    {/list}
</sshKeys>
```

```javascript
RGUI.SSHKeys = RGUI.ListView.extend({
    name: 'sshKeys',
    template: '<div class="m-sshKeys {class}" z-dis={disabled} r-hide={!visible}>{#inc this.$body}</div>',
    config() {
        this.data = Object.assign({
            multiple: true
        }, this.data);
        this.supr();
    }
});

RGUI.SSHKey = RGUI.Item.extend({
    name: 'sshKey',
    template: `
        <div class="u-sshKey {class}" z-sel={selected} z-dis={disabled} z-divider={divider} title={title} r-hide={!visible} on-click={this.select()}>
            <span>{#inc this.$body}</span>
            <i class="u-icon u-icon-check"></i>
        </div>
    ` 
});

let component = new RGUI.Component({
    template: template,
    data: {
        sshKeys: [
            '9ed236f8de294811a657acc4b8e92fd7',
            '0948a43c04b045b8ad63bc323ef06cb0',
            'a5c814940c9b4d8ab661831b391f9dca',
            'e2966c5c6347489ca16a0bf5659e2dcd',
        ]
    }
});
```

```css
.m-sshKeys {font-size: 0;}
.u-sshKey {
    display: inline-block; position: relative; cursor: pointer; 
    margin: 5px 0; margin-right: 20px; padding: 0 10px; width: 128px; height: 35px; line-height: 35px; font-size: 14px; 
    background: #f7f8fa; color: #333; border: 1px solid #d7dae0; border-radius: 2px;
}
.u-sshKey>span {display: block; overflow: hidden; word-wrap: normal; white-space: nowrap; text-overflow: ellipsis;}
.u-sshKey>i {
    display: none; position: absolute; z-index: 2; right: -8px; bottom: -6px;
    width: 18px; height: 18px; line-height: 18px; font-size: 10px;
    background: #67aaf5; color: white; border-radius: 100%;
}
.u-sshKey:hover {background: #edf1f3; border: 1px solid #d7dae0;}
.u-sshKey.z-sel {background: #f7fcfe; border-color: #67aaf5; box-shadow: inset 0 0 0 1px #67aaf5;}
.u-sshKey.z-sel>i {display: inline-block;}
.u-sshKey.z-dis {cursor: not-allowed; background: #f7f8fa; color: #ccc;}
```

### 选择密钥 - 升级版

<div class="m-example"></div>

```xml
{selectedCount}
<sshKeys>
    {#list sshKeys as sshKey}
    <sshKey title={sshKey.name} selected={sshKey.selected} disabled={!sshKey.selected && !canSelect}>{sshKey.name}</sshKey>
    {/list}
</sshKeys>
```

```javascript
let component = new RGUI.Component({
    template: template,
    data: {
        sshKeys: [
            {name: '9ed236f8de294811a657acc4b8e92fd7'},
            {name: '0948a43c04b045b8ad63bc323ef06cb0'},
            {name: 'a5c814940c9b4d8ab661831b391f9dca'},
            {name: 'e2966c5c6347489ca16a0bf5659e2dcd'},
            {name: 'f4f53b4c17d84b6eaf63429ee2194b2c'},
            {name: 'combperftest'},
            {name: 'd0175bcd124d44d58fdc5111145a5748'},
            {name: 'key0test'},
            {name: 'rtetet'},
            {name: '63bd3ac481354ba1aadec03acc386566'},
            {name: 'da19880cd576449881f9ee951e12c4f2'},
        ]
    },
    computed: {
        canSelect() {
            return this.data.sshKeys.filter((sshKey) => sshKey.selected).length < 5;
        }
    }
});
```
