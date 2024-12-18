import { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, message } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { MenuInterface } from "../../interfaces/IMenu";
import { DeleteMenu, GetAllMenus } from "../../services/https/index";

function Menu() {
  const navigate = useNavigate();
  const [menus, setMenus] = useState<MenuInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const myId = localStorage.getItem("id");

  const columns: ColumnsType<MenuInterface> = [
    { title: "ลำดับ", dataIndex: "ID", key: "id" },
    { title: "ชื่อเมนู", dataIndex: "menu_name", key: "menu_name" },
    {
      title: "ประเภท",
      key: "category_id",
      render: (record) => <>{record?.category?.category_name}</>,
    },
    { title: "ราคา", dataIndex: "menu_price", key: "menu_price" },
    { title: "จำนวน", dataIndex: "amount", key: "amount" },
    {
      title: "",
      render: (record) => (
        <>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/menu/edit/${record.ID}`)}
          >
            แก้ไขข้อมูล
          </Button>
        </>
      ),
    },
    {
      title: "",
      render: (record) => (
        <>
          {myId == record?.ID ? (
            <></>
          ) : (
            <Button
              type="dashed"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteMenu(record.ID)}
            ></Button>
          )}
        </>
      ),
    },
  ];

  const handleDeleteMenu = async (id: string) => {
    let res = await DeleteMenu(id);
    if (res.status == 200) {
      messageApi.open({
        type: "success",
        content: res.data.message,
      });
      await GetAllMenus();
    } else {
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  const fetchMenuData = async () => {
    let res = await GetAllMenus();
    if (res.status == 200) {
      setMenus(res.data);
    } else {
      setMenus([]);
      messageApi.open({
        type: "error",
        content: res.data.error,
      });
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>จัดการข้อมูลเมนูอาหารและเครื่องดื่ม</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/menu/create">
              <Button type="primary" icon={<PlusOutlined />}>
                สร้างข้อมูล
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table
          rowKey="ID" 
          columns={columns}
          dataSource={menus}
          scroll={{ x: "max-content" }}
        />
      </div>
    </>
  );
}

export default Menu;
