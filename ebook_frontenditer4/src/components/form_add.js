import {Form, Input, Modal} from "antd";
import React from "react";

const CreateForm = ({ visible, submitMap, onCancel, currentDetailData }) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };
    let initValues = currentDetailData == true ? {} :
        {
            bid: "书籍编号将自动分配"
        }

    form.setFieldsValue(initValues)
    return (
        <Modal
            visible={visible}
            title="添加书籍"
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
                <Form.Item label="编号" name="bid" >
                    <Input disabled/>
                </Form.Item>
                <Form.Item label="书名" name="bookname" >
                    <Input/>
                </Form.Item>
                <Form.Item label="封面" name="image" >
                    <Input/>
                </Form.Item>
                <Form.Item label="作者" name="author" >
                    <Input/>
                </Form.Item>
                <Form.Item label="描述" name="description" >
                    <Input/>
                </Form.Item>
                <Form.Item label="ISBN" name="isbn" >
                    <Input/>
                </Form.Item>
                <Form.Item label="库存量" name="inventory" >
                    <Input/>
                </Form.Item>
                <Form.Item label="价格" name="price" >
                    <Input/>
                </Form.Item>
                <Form.Item label="类型" name="type" >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateForm;