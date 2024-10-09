import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

const DeleteForm = ({ visible, submitMap, onCancel, bid }) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };
    let initValues = bid == true ? {} :
        {
            // bid: bid,
            need: "请查看好书籍编号进行删除"
        }

    form.setFieldsValue(initValues)
    return (
        <Modal
            visible={visible}
            title="删除书籍"
            onCancel={onCancel}
            width={800}
            destroyOnClose={true}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        form.setFieldsValue(values)
                        submitMap(values);
                    })
                    .catch(info => {
                        console.log('校验失败:', info);
                    });
            }}
        >
            <Form
                form={form}
                {...layout}
                name="serverDetail"
                initialValues={initValues}
            >
                <Form.Item label="须知" name="need" >
                    <Input disabled/>
                </Form.Item>
                <Form.Item label="书籍编号" name="bid" >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );

}

export default DeleteForm;