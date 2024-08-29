import React, { useEffect, useState } from "react";
import { Button, Form, Input, Popconfirm, Table, Modal, message, InputNumber, Select, DatePicker } from 'antd'
import './user.css'
import { getUser, addUser, editUser, deleteUser } from '../../api'
import { useForm } from "antd/es/form/Form";

const User = () => {
    const [ listData, setListData ] = useState({
        name: ''
    })
    const [ tableData, setTableData ] = useState([])
    // 0-新增， 1-编辑
    const [ modalType, setModalType ] = useState(0)
    const [ isModalOpen, setIsModalOpen] = useState(false)
    // 创建Form实例
    const [ form ] = Form.useForm()

    //新增/编辑按钮
    const handleClick = (type, rowData) => {
        setIsModalOpen(!isModalOpen)
        if (type == 'add' )
        {
            setModalType(0)
        } else {
            setModalType(1)
        }

    }
    //删除
    const handkleDelete = ({ id }) => {
        deleteUser({ id }).then(() => {
            getTableData()
        })
    }
    //提交
    const handleFinish = (e) => {
        setListData({
            name: e.keyword
        })
        console.log(e)
    }
    useEffect(() => {
        getTableData()
    }, [listData])

    const getTableData = () => {
        getUser(listData).then(({ data }) =>{
            // console.log(res, 'res')
            setTableData(data.list)
        })
    }

    //点击弹窗事件
    const handleOk = () => {

    }

     //点击取消事件
     const handleCancel = () => {
        setIsModalOpen(false)
     }
    
    const columns = [
        {
            title:'姓名',
            dataIndex: 'name'
        },
        {
            title:'年龄',
            dataIndex: 'age'
        },
        {
            title:'性别',
            dataIndex: 'sex',
            render: (val) => {
                return val ? '女' : '男'
            }
        },
        {
            title:'出生日期',
            dataIndex: 'birth'
        },
        {
            title:'地址',
            dataIndex: 'addr'
        },
        {
            title:'操作',
            render: (rowData) => {
                return (
                    <div className='flex-box'>
                        <Button style={{ marginRight: '5px' }} onClick={() => handleClick('edit', rowData)}>编辑</Button>
                        <Popconfirm
                            title="提示"
                            description="此操作将删除该用户，是否继续？"
                            okText="确认"
                            cancelText="取消"
                            onConfirm={ () => handkleDelete(rowData) }
                        >
                            <Button type="primary" danger>删除</Button>
                        </Popconfirm>
                    </div>
                )
            }
        },
    ]
    useEffect(() => {
        //调用后端接口获取用户数据
        getTableData()
    }, [])

    return (
        <div className="user">
            <div className="flex-box space-between"   >
                <Button type="primary" onClick={() => handleClick('add')}>+新增</Button>
                <Form
                    layout="inline"
                    onFinish={handleFinish}
                >
                    <Form.Item name="keyword">
                        <Input placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">搜索</Button>
                    </Form.Item>
                </Form>
            </div>
            <Table style={{ marginTop: '10px' }} columns={columns} dataSource={tableData} rowKey={'id'}></Table>
            <Modal
                open={isModalOpen}
                title={modalType ? "编辑用户" : "新增用户"}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确定"
                cancelText="取消"
            >
                <Form
                    form={form}
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18
                    }}
                    labelAlign="left"
                >
                    <Form.Item
                        label="姓名"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '请输入姓名'

                            }
                        ]}
                    >
                        <Input placeholder="请输入姓名"/>
                    </Form.Item>
                    <Form.Item
                        label="年龄"
                        name="age"
                        rules={[
                            {
                                required: true,
                                message: '请输入年龄'
                            },
                            {
                                type: 'number',
                                message: '年龄必须是数字'

                            }
                        ]}
                    >
                        <InputNumber placeholder="请输入年龄"/>
                    </Form.Item>
                    <Form.Item
                        label="性别"
                        name="sex"
                        rules={[
                            {
                                required: true,
                                message: '请输入性别'
                            }
                        ]}
                    >
                        <Select 
                            placeholder='请选择性别'
                            options={[
                                { value: 0, label: '男' },   
                                { value: 1, label: '女'}
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="出生日期"
                        name="birth"
                        rules={[
                            {
                                required: true,
                                message: '请输入出生日期'
                            }
                        ]}
                    >
                        <DatePicker placeholder='请选择出生日期' format="YYYY/MM/DD"
                        />
                    </Form.Item>
                    <Form.Item
                        label="地址"
                        name="addr"
                        rules={[
                            {
                                required: true,
                                message: '请输入地址'
                            }
                        ]}
                    >
                        <Input placeholder="请输入地址"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
} 

export default User