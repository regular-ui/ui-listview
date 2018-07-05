import { Component } from 'rgui-ui-base';
import template from './index.rgl';

/**
 * @class ListView
 * @extends Component
 * @param {Object}                  options.data                     =  绑定属性
 * @param {var}                     options.data.value              <=> 当前选择的值
 * @param {boolean=false}           options.data.multiple            => 是否可以多选
 * @param {boolean=false}           options.data.cancelable          => 是否可以取消选择
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
        this.defaults({
            _list: [],
            _selected: undefined,
            value: undefined,
            multiple: false,
            cancelable: false,
        });
        this.supr();
        this.watch();
    },
    /**
     * @protected
     * @override
     */
    watch() {
        this.$watch('value', (value) => {
            if (!this.data._selected || this.data._selected.data.value !== value)
                this.data._selected = this.data._list.find((item) => item.data.value === value);

            /**
             * @event change 选择值改变时触发
             * @property {object} sender 事件发送对象
             * @property {Item} selected 改变后的选择项
             * @property {var} value 改变后的选择值
             */
            this.$emit('change', {
                sender: this,
                selected: this.data._selected,
                value,
            });
        });

        this.$watch('_selected', (_selected, _oldSelected) => {
            // 改变item的选择状态
            this.data._list.forEach((item) => {
                item.data.selected = false;
            });
            _selected && (_selected.data.selected = true);
            // 设置value
            if (this.data.preventValue) {
                if (_selected) {
                    this.data.value = _selected.data.value;
                }
            } else {
                this.data.value = _selected ? _selected.data.value : _selected;
            }
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
        else if (this.data.cancelable && this.data._selected === item)
            this.data._selected = undefined;
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
