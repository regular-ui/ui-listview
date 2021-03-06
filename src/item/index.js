import { Component, _ } from 'rgui-ui-base';
import template from './index.rgl';

/**
 * @class Item
 * @extends Component
 * @param {Object}                  options.data                     =  绑定属性
 * @param {var}                     options.data.value              <=> 该项的值
 * @param {boolean=false}           options.data.selected           <=> 该项是否被选中
 * @param {boolean=false}           options.data.divider             => 设置该项为分隔线
 * @param {string}                  options.data.title               => 该项的工具提示
 * @param {boolean=false}           options.data.disabled            => 禁用该项
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
const Item = Component.extend({
    name: 'item',
    template,
    /**
     * @protected
     * @override
     */
    config() {
        this.defaults({
            value: undefined,
            selected: false,
            disabled: false,
            divider: false,
            title: undefined,
        });
        this.supr();

        // 没有$outer就直接报错
        this.$outer.data._list.push(this);

        // 多选时不使用`value`和`_selected`
        if (this.$outer.data.multiple)
            return;
        // 与$outer的value相等时自动设为选中
        if (this.data.value !== undefined && this.$outer.data.value === this.data.value)
            this.data.selected = true;
        // 初始化时选择selected为true的item
        if (this.data.selected)
            this.$outer.data._selected = this;
    },
    /**
     * @protected
     * @override
     */
    destroy() {
        if (this.$outer.data._selected === this)
            this.$outer.data._selected = undefined;
        // 从$outer组件的列表中删除自己
        const index = this.$outer.data._list.indexOf(this);
        ~index && this.$outer.data._list.splice(index, 1);
        this.supr();
    },
    /**
     * @method select() 选择该项
     * @public
     * @return {void}
     */
    select() {
        if (this.data.disabled || this.data.divider)
            return;

        this.$outer.select(this);

        /**
         * @event select 选择该项时触发
         * @property {object} sender 事件发送对象
         * @property {Item} selected 当前选择项
         * @property {var} value 当前选择值
         */
        this.$emit('select', {
            sender: this,
            selected: this,
            value: this.data.value,
        });
    },
}).directive({
    'z-divider': _.createBoolClassDirective('z-divider'),
});

export default Item;
