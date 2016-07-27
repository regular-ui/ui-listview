import { Component } from 'rgui-ui-base';
import ListView from '../';
import Item from '../../item';

describe('ListView', () => {
    describe('initialized without params', () => {
        const component = new Component({
            template: `<listView>
                <item>选项1</item>
                <item>选项2</item>
                <item>选项2</item>
            </listView>`,
        });
        const listView = component._children[0];

        it('should have items.', () => {
            expect(listView.data._list.length).to.be(3);
        });

        it('should not select any item.', () => {
            expect(listView.data._selected).to.be(undefined);
        });
    });

    describe('initialized with values', () => {
        const component = new Component({
            template: `<listView value=2>
                <item value=1>选项1</item>
                <item value=2>选项2</item>
                <item value=3>选项2</item>
            </listView>`,
        });
        const listView = component._children[0];
        const item1 = component._children[1];
        const item2 = component._children[2];
        const item3 = component._children[3];

        it('should select the correct item.', () => {
            expect(listView.data._selected).to.be(item2);
        });

        it('should change state of the selected item.', () => {
            expect(listView.data._selected.data.selected).to.be(true);
        });
    });

    describe('initialized with a selected item', () => {
        const component = new Component({
            template: `<listView>
                <item value=1>选项1</item>
                <item value=2>选项2</item>
                <item value=3 selected>选项3</item>
            </listView>`,
        });
        const listView = component._children[0];
        const item1 = component._children[1];
        const item2 = component._children[2];
        const item3 = component._children[3];

        it('should select the correct item.', () => {
            expect(listView.data._selected).to.be(item3);
        });

        it('should change the `value`.', () => {
            expect(listView.data.value).to.be(item3.data.value);
        });

        describe('ListView#select(item) && Item#select()', () => {
            it('should select the item', () => {
                item1.select();
                listView.$update();
                expect(listView.data._selected).to.be(item1);
            });

            it('should change the `value`.', () => {
                expect(listView.data.value).to.be(item1.data.value);
            });

            it('should not react when listView is readonly.', () => {
                listView.data.readonly = true;
                item2.select();
                listView.$update();
                expect(listView.data._selected).not.to.be(item2);
                listView.data.readonly = false;
            });

            it('should not react when listView is disabled.', () => {
                listView.data.disabled = true;
                item2.select();
                listView.$update();
                expect(listView.data._selected).not.to.be(item2);
                listView.data.disabled = false;
            });

            it('should not react when item is disabled.', () => {
                item2.data.disabled = true;
                item2.select();
                listView.$update();
                expect(listView.data._selected).not.to.be(item2);
                item2.data.disabled = false;
            });

            it('should not react when item is a divider.', () => {
                item2.data.divider = true;
                item2.select();
                listView.$update();
                expect(listView.data._selected).not.to.be(item2);
                item2.data.divider = false;
            });
        });
    });

    describe('initialized with a dynamic and empty array', () => {
        const component = new Component({
            template: `<listView value={2}>
                {#list list as item}
                    <item value={item}>选项{item}</item>
                {/list}
            </listView>`,
            data: { list: [] },
        });
        const listView = component._children[0];

        it('should not select a item.', () => {
            expect(listView.data._selected).to.be(undefined);
        });

        describe('when push items in the array', () => {
            it('should sync the `_list`.', () => {
                component.data.list.push(1, 2, 3);
                component.$update();
                expect(listView.data._list.length).to.be(3);
            });

            it('should not change the value.', () => {
                expect(listView.data.value).to.be(2);
            });

            it('should select item by value.', () => {
                expect(listView.data._selected).to.be(listView.data._list[1]);
            });
        });

        describe('when change the array without a same-value item', () => {
            it('should not have any value.', () => {
                component.data.list = [1, 8, 6, 0];
                component.$update();
                expect(listView.data.value).to.be(undefined);
            });

            it('should not select any item.', () => {
                expect(listView.data._selected).to.be(undefined);
            });
        });

        describe('when change the array with a same-value item', () => {
            it('should select item by value.', () => {
                listView.data.value = 2;
                component.data.list = [4, 5, 7, 2, 11];
                component.$update();
                expect(listView.data._selected).to.be(listView.data._list[3]);
            });
        });

        describe('when empty the array', () => {
            it('should sync the `_list`.', () => {
                component.data.list = [];
                component.$update();
                expect(listView.data._list.length).to.be(0);
            });

            it('should not have any value', () => {
                expect(listView.data.value).to.be(undefined);
            });

            it('should not select any item.', () => {
                expect(listView.data._selected).to.be(undefined);
            });
        });
    });

    describe('initialized with `multiple` property', () => {
        const component = new Component({
            template: `<listView multiple>
                <item value=1>选项1</item>
                <item value=2 selected>选项2</item>
                <item value=3>选项3</item>
                <item value=4 disabled>选项4（禁用）</item>
                <item value=5 selected>选项5</item>
            </listView>`,
        });
        const listView = component._children[0];
        const item1 = component._children[1];
        const item2 = component._children[2];
        const item3 = component._children[3];

        it('should not change the `_selected`.', () => {
            expect(listView.data._selected).to.be(undefined);
        });

        describe('ListView#select(item) && Item#select()', () => {
            it('should toggle state of selected item.', () => {
                item2.select();
                listView.$update();
                expect(item2.data.selected).to.be(false);
                item2.select();
                listView.$update();
                expect(item2.data.selected).to.be(true);
            });

            it('should not change the `_selected`.', () => {
                expect(listView.data._selected).to.be(undefined);
            });
        });
    });

    describe('initialized with `multiple` property and a dynamic array', () => {
        const component = new Component({
            template: `<listView multiple>
                {#list list as item}
                    <item selected={!!item}>选项{item_index}</item>
                {/list}
            </listView>`,
            data: { list: [0, 1, 1, 0] },
        });
        const listView = component._children[0];

        describe('when push items in the array', () => {
            it('should not change the old items\' states.', () => {
                component.data.list.push(0, 1, 1);
                component.$update();
                expect(listView.data._list[1].data.selected).to.be(true);
                expect(listView.data._list[2].data.selected).to.be(true);
                expect(listView.data._list[5].data.selected).to.be(true);
                expect(listView.data._list[6].data.selected).to.be(true);
            });
        });

        describe('when change the array', () => {
            it('should select correct items.', () => {
                component.data.list = [1, 0, 1];
                component.$update();
                expect(listView.data._list[0].data.selected).to.be(true);
                expect(listView.data._list[2].data.selected).to.be(true);
            });
        });
    });

    describe('initialized with `cancelable` property', () => {
        const component = new Component({
            template: `<listView cancelable>
                <item value=1>选项1</item>
                <item value=2>选项2</item>
                <item value=3 selected>选项3</item>
            </listView>`,
        });
        const listView = component._children[0];
        const item1 = component._children[1];
        const item2 = component._children[2];
        const item3 = component._children[3];

        describe('ListView#select(item) && Item#select()', () => {
            it('should cancel the selected item.', () => {
                item3.select();
                listView.$update();
                expect(listView.data._selected).to.be(undefined);
            });

            it('should change item state.', () => {
                expect(item2.data.selected).to.be(false);
            });

            it('should change the `value`.', () => {
                expect(listView.data.value).to.be(undefined);
            });
        });
    });
});
