import React, { useState } from 'react';
import { useSyncStore } from '../store/synctodos';

import {
  Card,
  Button,
  Input,
  Modal,
  Switch,
  Popconfirm,
  message,
  Empty,
  Tag,
  Row,
  Col,
  Space
} from 'antd';

import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

const Createsync = () => {
  const { data, deleteUser, toggleStatus, updateUser, addUser } = useSyncStore();

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [addModal, setAddModal] = useState(false);
  const [addName, setAddName] = useState('');
  const [addDesc, setAddDesc] = useState('');
  const [addStatus, setAddStatus] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editStatus, setEditStatus] = useState(false);

  const filteredData = data
    .filter(item => filterStatus === 'all' || item.status === (filterStatus === 'true'))
    .filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  const handleAdd = () => {
    if (!addName.trim()) return message.error('Name is required!');
    addUser(addName.trim(), addDesc.trim(), addStatus);
    message.success('User added!');
    setAddName('');
    setAddDesc('');
    setAddStatus(false);
    setAddModal(false);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditDesc(item.description);
    setEditStatus(item.status);
    setEditModal(true);
  };

  const handleEdit = () => {
    if (!editName.trim()) return message.error('Name is required!');
    updateUser(editId, editName.trim(), editDesc.trim(), editStatus);
    message.success('User updated!');
    setEditModal(false);
  };

  const handleDelete = (id) => {
    deleteUser(id);
    message.success('User deleted!');
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <Space style={{ marginBottom: 20, width: '100%' }} size="middle" wrap>
          <Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => setAddModal(true)}>
            Add User
          </Button>

          <Input
            placeholder="Search by name..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />

          <Button onClick={() => setFilterStatus(filterStatus === 'all' ? 'true' : filterStatus === 'true' ? 'false' : 'all')}>
            {filterStatus === 'all' ? 'All' : filterStatus === 'true' ? 'Active' : 'Inactive'}
          </Button>
        </Space>

        {filteredData.length === 0 ? (
          <Empty description="No data found" />
        ) : (
          <Row gutter={[24, 24]}>
            {filteredData.map(item => (
              <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                <Card
                  hoverable
                  style={{ borderRadius: 12 }}
                  actions={[
                    <Switch
                      checked={item.status}
                      onChange={() => toggleStatus(item.id)}
                      checkedChildren="Active"
                      unCheckedChildren="Inactive"
                    />,
                    <EditOutlined onClick={() => openEdit(item)} style={{ color: '#1890ff' }} />,
                    <Popconfirm
                      title="Delete this user?"
                      onConfirm={() => handleDelete(item.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined style={{ color: '#ff4d4f' }} />
                    </Popconfirm>
                  ]}
                >
                  <Card.Meta
                    title={<strong>{item.name}</strong>}
                    description={item.description}
                  />
                  <div style={{ marginTop: 16 }}>
                    <Tag color={item.status ? 'green' : 'red'}>
                      {item.status ? 'Active' : 'Inactive'}
                    </Tag>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <Modal
          title="Add New User"
          open={addModal}
          onCancel={() => setAddModal(false)}
          onOk={handleAdd}
          okText="Add"
          cancelText="Cancel"
        >
          <div style={{ marginBottom: 16 }}>
            <label>Name *</label>
            <Input
              placeholder="Enter name..."
              value={addName}
              onChange={e => setAddName(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Description</label>
            <Input.TextArea
              rows={3}
              placeholder="Enter description..."
              value={addDesc}
              onChange={e => setAddDesc(e.target.value)}
            />
          </div>
          <div>
            <label>Status</label><br />
            <Switch
              checked={addStatus}
              onChange={setAddStatus}
              checkedChildren="Active"
              unCheckedChildren="Inactive"
            />
          </div>
        </Modal>

        <Modal
          title="Edit User"
          open={editModal}
          onCancel={() => setEditModal(false)}
          onOk={handleEdit}
          okText="Save"
          cancelText="Cancel"
        >
          <div style={{ marginBottom: 16 }}>
            <label>Name *</label>
            <Input
              value={editName}
              onChange={e => setEditName(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label>Description</label>
            <Input.TextArea
              rows={3}
              value={editDesc}
              onChange={e => setEditDesc(e.target.value)}
            />
          </div>
          <div>
            <label>Status</label><br />
            <Switch
              checked={editStatus}
              onChange={setEditStatus}
              checkedChildren="Active"
              unCheckedChildren="Inactive"
            />
          </div>
        </Modal>

      </div>
    </div>
  );
};

export default Createsync;