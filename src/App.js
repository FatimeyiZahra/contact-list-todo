import React, { useRef, useState } from "react";
import { Button, Table, Modal, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Space } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import "./index.css";
const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [error, setError] = useState();
  const [q, setQ] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      name: "Zahra",
      email: "zahra@gmail.com",
    },
    {
      key: 2,
      name: "David",
      email: "david@gmail.com",
    },
    {
      key: 3,
      name: "James",
      email: "james@gmail.com",
    },
  ]);
  const nameRef = useRef();
  const emailRef = useRef();
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "key",
      responsive: ["md"],
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
      responsive: ["md"],
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
      responsive: ["md"],
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Dropdown overlay={getMenu(record)} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <MoreOutlined />
                </Space>
              </a>
            </Dropdown>
            {/* <EditOutlined />
            <DeleteOutlined style={{ color: "red", marginLeft: 12 }}/> */}
          </>
        );
      },
    },
  ];

  const onEditUser = (record) => {
    setIsModalVisible(true);
    setEditingUser(record);
  };

  const onDeleteUser = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource(dataSource.filter((user) => user.key !== record.key));
      },
    });
  };

  const getMenu = (record) => (
    <ul className="dropDown">
      <li
        onClick={() => {
          onEditUser(record);
        }}
      >
        <EditOutlined /> edit
      </li>
      <li
        onClick={() => {
          onDeleteUser(record);
        }}
      >
        <DeleteOutlined /> delete
      </li>
    </ul>
  );

  const handleOk = () => {
    setIsModalVisible(false);
    setDataSource((pre) =>
      pre.map((user) => (user.key === editingUser.key ? editingUser : user))
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const onAddUser = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    if (nameRef.current.value !== null && emailRef.current.value) {
      const newUser = {
        key: randomNumber,
        name: nameRef.current.value,
        email: emailRef.current.value,
      };
      setDataSource((pre) => [...pre, newUser]);
      setError("");
    } else {
      setError("butun xanalari doldurun");
    }
  };

  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  return (
    <div style={{ margin: "50px" }}>
      <input
        type="text"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="search.."
      />
      <div>
        <label className="text-danger">{error ? error : ""}</label>
        <input type="text" placeholder="name" ref={nameRef} />
        <input type="text" placeholder="email" ref={emailRef} />
        <button onClick={onAddUser}>add user</button>
      </div>
      <Table columns={columns} dataSource={search(dataSource)}></Table>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          type="text"
          value={editingUser?.name}
          onChange={(e) => {
            setEditingUser((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
        <input
          type="text"
          value={editingUser?.email}
          onChange={(e) => {
            setEditingUser((pre) => {
              return { ...pre, email: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
};

export default App;
