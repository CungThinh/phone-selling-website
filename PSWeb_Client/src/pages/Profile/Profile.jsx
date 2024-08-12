import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/Slice/UserSlice";
import { Button, Upload, Input, Form } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";
import "./Profile.css";
import { Navbar } from "../../components/navbar";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [city, setCity] = useState(user.city || "");
  const [newAvatarFile, setNewAvatarFile] = useState(null); // State để lưu trữ tạm thời tệp tin ảnh

  const dispatch = useDispatch();
  const mutation = useMutationHooks((data) => {
    const { id, ...rest } = data;
    return UserService.updateUser(id, rest);
  });

  const { isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success("Profile updated successfully!");
      dispatch(updateUser({...user, name, phone, address, avatar, city }));
    } else if (isError) {
      message.error("Error updating profile.");
    }
  }, [isSuccess, isError, dispatch, user, name, phone, address, avatar, city]);

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (file) {
      setNewAvatarFile(file.originFileObj); // Lưu trữ tạm thời tệp tin ảnh
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      setAvatar(file.preview);
      message.success("Photo selected successfully!");
    }
  };

  const handleUpdate = () => {
    // Tạo một formData chỉ khi có tệp tin ảnh mới
    const formData = new FormData();
    if (newAvatarFile) {
      formData.append('avatar', newAvatarFile);
    }
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('city', city);

    mutation.mutate({ id: user.id, ...Object.fromEntries(formData.entries()) });
  };

  return (
    <>
      <Navbar/>
      <section className="h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center">
            <div className="col col-lg-9 col-xl-8">
              <div className="card">
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: "#000", height: 200 }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: 150 }}>
                    <img
                      src={avatar || "https://cdn.pixabay.com/photo/2017/07/18/23/23/user-2517433_640.png"}
                      alt="Avatar"
                      className="img-fluid img-thumbnail mt-4 mb-5"
                      style={{ width: 150, zIndex: 1 }}
                    />
                    <Upload showUploadList={false} beforeUpload={() => false} onChange={handleOnchangeAvatar}>
                      <Button icon={<UploadOutlined />} className="btn btn-outline-dark text-body" style={{ zIndex: 1 }}>
                        Upload Photos
                      </Button>
                    </Upload>
                  </div>
                  <div className="ms-3" style={{ marginTop: 110 }}>
                    <h5>{name || "User Name"}</h5>
                    <p>{email || "User Email"}</p>
                  </div>
                </div>
                <div className="p-4 text-black bg-body-tertiary">
                  <div className="d-flex justify-content-end text-center py-1 text-body">
                    <div>
                      <p className="mb-1 h5">253</p>
                      <p className="small text-muted mb-0">Photos</p>
                    </div>
                    <div className="px-3">
                      <p className="mb-1 h5">1026</p>
                      <p className="small text-muted mb-0">Followers</p>
                    </div>
                    <div>
                      <p className="mb-1 h5">478</p>
                      <p className="small text-muted mb-0">Following</p>
                    </div>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-5 text-body">
                    <p className="lead fw-normal mb-1">About</p>
                    <div className="p-4 bg-body-tertiary">
                      <Form layout="vertical" onFinish={handleUpdate}>
                        <Form.Item label="Name">
                          <Input value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Email">
                          <Input value={email} onChange={(e) => setEmail(e.target.value)} disabled />
                        </Form.Item>
                        <Form.Item label="Phone">
                          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Address">
                          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="City">
                          <Input value={city} onChange={(e) => setCity(e.target.value)} />
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isLoading}>
                          Update
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;