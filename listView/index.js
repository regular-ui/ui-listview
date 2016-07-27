import { Component } from 'rgui-ui-base';
import template from './index.rgl';

/**
 * @class ListView
 * @extend Component
 * @param {object}                  options.data                     =  绑定属性
 * @param {var}                     options.data.value              <=> 当前选择的值
 * @param {boolean=false}           options.data.multiple            => 是否可以多选
 * @param {boolean=false}           options.data.readonly            => 是否只读
 * @param {boolean=false}           options.data.disabled            => 是否禁用
 * @param {boolean=true}            options.data.visible             => 是否显示
 * @param {string=''}               options.data.class               => 补充class
 */
const ListView = Component.extend({
    name: 'listView',
    template,
    /**
     * @protected
     * @override
     */
    config() {
        this.data = Object.assign({
            _list: [],
            _selected: undefined,
            value: undefined,
            multiple: false,
        }, this.data);
        this.supr();
        this.watch();
    },
    watch() {
        this.$watch('value', (newValue, oldValue) => {
            if (!this.data._selected || this.data._selected.data.value !== newValue)
                this.data._selected = this.data._list.find((item) => item.data.value === newValue);

            /**
             * @event change 选择值改变时触发
             * @property {object} sender 事件发送对象
             * @property {Item} selected 改变后的选择项
             * @property {var} value 改变后的选择值
             */
            this.$emit('change', {
                sender: this,
                selected: this.data._selected,
                value: newValue,
            });
        });

        this.$watch('_selected', (newValue, oldValue) => {
            // 改变item的选择状态
            oldValue && (oldValue.data.selected = false);
            newValue && (newValue.data.selected = true);
            // 设置value
            this.data.value = newValue ? newValue.data.value : newValue;
        });
    },
    /**
     * @method select(item) 选择某一项
     * @public
     * @param  {Item} item 选择项
     * @return {void}
     */
    select(item) {
        if (this.data.readonly || this.data.disabled)
            return;

        if (this.data.multiple)
            item.data.selected = !item.data.selected;
        else
            this.data._selected = item;

        /**
         * @event select 选择某一项时触发
         * @property {object} sender 事件发送对象
         * @property {Item} selected 当前选择项
         * @property {var} value 当前选择值
         */
        this.$emit('select', {
            sender: this,
            selected: item,
            value: item.data.value,
        });
    },
});

export default ListView;
