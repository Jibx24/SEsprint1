import { Space, Button, Col, Row, Divider, Form, Input, Card, message, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { CreateMenu, GetCategory } from "../../../services/https/index";
import { MenuInterface } from "../../../interfaces/IMenu";
import { CategoryInterface } from "../../../interfaces/ICategory";

function MenuCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [category, setCategory] = useState<CategoryInterface[]>([]);

  const onGetCategory = async () => {
    let res = await GetCategory();
    if (res.status == 200) {
      setCategory(res.data);
    } else {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลประเภท",
      });
      setTimeout(() => {
        navigate("/menu");
      }, 2000);
    }
  };

  const onFinish = async (values: MenuInterface) => {
    const payload = {
      ...values,
      menu_price: parseFloat(values.menu_price), 
      amount: parseInt(values.amount.toString(), 10)
    };
  
    try {
      const res = await CreateMenu(payload);
      if (res.status === 201) {
        messageApi.success(res.data.message);
        setTimeout(() => {
          navigate("/menu");
        }, 2000);
      } else {
        messageApi.error(res.data.error || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      messageApi.error("เกิดข้อผิดพลาดในการสร้างเมนู");
    }
  };
  

  useEffect(() => {
    onGetCategory();
    return () => {};
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2>เพิ่มเมนูอาหารและเครื่องดื่ม</h2>
        <Divider />

        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อเมนู"
                name="menu_name"
                rules={[{ required: true, message: "กรุณากรอกชื่อเมนู!" }]} >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ประเภท"
                name="category_id"
                rules={[
                  {required: true,message: "กรุณาเลือกประเภท !",},]}
              >
                 <Select defaultValue="" style={{ width: "100%" }}>
                  {category?.map((item) => (
                    <Select.Option
                      value={item?.ID}
                    >
                      {item?.category_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ราคา"
                name="menu_price"
                rules={[{ required: true, message: "กรุณากรอกราคา!" }]}>
              <Input type="number" step="0.01" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="จำนวน"
                name="amount"
                rules={[{ required: true, message: "กรุณากรอกจำนวน!" }]}>
              <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Link to="/menu">
                    <Button htmlType="button" style={{ marginRight: "10px" }}>
                      ยกเลิก
                    </Button>
                  </Link>
                  <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                    ยืนยัน
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default MenuCreate;
