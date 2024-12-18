import { useState, useEffect } from "react";
import { Space, Button, Col, Row, Divider, Form, Input, Card, message, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, Link, useParams } from "react-router-dom";
import { GetMenu, UpdateMenu, GetCategory} from "../../../services/https/index";  
import { MenuInterface } from "../../../interfaces/IMenu";
import { CategoryInterface } from "../../../interfaces/ICategory";

function MenuEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: any }>(); 
  const [messageApi, contextHolder] = message.useMessage();
  const [category, setCategory] = useState<CategoryInterface[]>([]);
  const [form] = Form.useForm();
  
  const onGetCategory = async () => {
    let res = await GetCategory();
    console.log("Category Response:", res);  // Log category data for debugging
    if (res.status == 200) {
      setCategory(res.data);
    } else {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลประเภท",
      });
    }
  };  

  const getMenu = async (id: string) => {
    let res = await GetMenu(id);
    console.log("GetMenu Response:", res);  // Log the response to debug
    if (res.status == 200) {
      form.setFieldsValue({
        menu_name: res.data.menu_name,
        category_id: res.data.category?.ID,
        menu_price: res.data.menu_price,
        amount: res.data.amount,
      });
    } else {
      messageApi.open({
        type: "error",
        content: "ไม่พบข้อมูลเมนู",
      });
      setTimeout(() => {
        navigate("/menu");
      }, 2000);
    }
  };
  
  const onFinish = async (values: MenuInterface) => {
    if (!id) {
      messageApi.open({ type: "error", content: "Menu ID is required" });
      return;
    }
    const payload = {
      ...values,
      menu_price: parseFloat(values.menu_price),
      amount: parseInt(values.amount.toString(), 10),
    };
    try {
      const res = await UpdateMenu(id, payload);
      const { status, data } = res;
      if (status === 200) {
        messageApi.open({ type: "success", content: data.message });
        setTimeout(() => navigate("/menu"), 2000);
      } else {
        const errorMsg = data?.error || "Something went wrong";
        messageApi.open({ type: "error", content: errorMsg });
      }
    } catch (error) {
      console.error("Error during API call:", error);
      messageApi.open({ type: "error", content: "An unexpected error occurred." });
    }
  };  

  useEffect(() => {
    onGetCategory();
    getMenu(id);
  }, []);
 
  return (
    <div>
      {contextHolder}
      <Card>
        <h2>แก้ไขข้อมูลเมนูอาหารและเครื่องดื่ม</h2>
        <Divider />
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 0]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อเมนู"
                name="menu_name"
                rules={[{ required: true, message: "กรุณากรอกชื่อเมนู !" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ประเภท"
                name="category_id"
                rules={[{ required: true,message: "กรุณาเลือกเพศ !",},]}
              >
                <Select defaultValue="" style={{ width: "100%" }}>
                  {category?.map((item) => (
                    <Select.Option value={item?.ID}>
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
                rules={[{ required: true, message: "กรุณากรอกราคา !" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="จำนวน"
                name="amount"
                rules={[{ required: true, message: "กรุณากรอกจำนวน !" }]}
              >
                <Input />
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
                    บันทึก
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

export default MenuEdit;
