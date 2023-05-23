import React, { useState } from 'react';
import { Layout, Button, Card, Input, Row, Col, Modal } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';

const { Content } = Layout;

const App = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState(null);

  const handleAddProject = () => {
    if (projectName) {
      const newProject = {
        id: Date.now(),
        name: projectName,
        createdDate: new Date().toLocaleDateString()
      };

      setProjects([...projects, newProject]);
      setProjectName('');
      setShowAddCard(false);
    }
  };

  const handleShowAddCard = () => {
    setShowAddCard(true);
  };

  const handleDeleteProject = (projectId) => {
    setDeletingProjectId(projectId);
    setDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = () => {
    const updatedProjects = projects.filter(project => project.id !== deletingProjectId);
    setProjects(updatedProjects);
    setDeleteConfirmationVisible(false);
  };

  const handleCancelDelete = () => {
    setDeletingProjectId(null);
    setDeleteConfirmationVisible(false);
  };

  const handleEditProject = (projectId) => {
    setEditingProjectId(projectId);
  };

  const handleSaveProject = (projectId) => {
    setEditingProjectId(null);
  };

  const isEditing = (projectId) => {
    return projectId === editingProjectId;
  };

  const handleProjectNameChange = (projectId, value) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          name: value
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', background: '#F7F9FD' }}>
        <img src="/ThunkableBeaver.png" alt="Logo" style={{ width: '64px', margin: '32px' }} />
        <div>
          <span style={{ fontSize: '18px', display: 'block', marginLeft: '32px' }}>My Projects</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '16px' }}>
          <Button type="primary" shape="circle" icon={<PlusOutlined />} style={{ backgroundColor: '#3D3A4F', width: '48px', height: '48px', marginRight: '32px' }} onClick={handleShowAddCard} />
        </div>
      </div>
      <Content style={{ padding: '16px' }}>
        {showAddCard && (
          <Card style={{ marginBottom: '16px' }}>
            <Row align="middle" gutter={16}>
              <Col>
                <img src="/defaultProjectIcon_2x.png" alt="Project" style={{ width: '48px', height: '48px' }} />
              </Col>
              <Col flex="auto">
                <Input value={projectName} onChange={e => setProjectName(e.target.value)} />
              </Col>
              <Col>
                <Button type="primary" onClick={handleAddProject}>Add Project</Button>
              </Col>
            </Row>
          </Card>
        )}
        {projects.map(project => (
          <Card key={project.id} style={{ marginBottom: '16px' }}>
            <Row align="middle" gutter={16}>
              <Col flex="5%" style={{ border: 'solid black 2px' }}>
                <img src="/defaultProjectIcon_2x.png" alt="Project" style={{ width: '48px', height: '48px' }} />
              </Col>
              <Col flex="20%">
                {isEditing(project.id) ? (
                  <Input
                    value={project.name}
                    onChange={e => handleProjectNameChange(project.id, e.target.value)}
                    onPressEnter={() => handleSaveProject(project.id)}
                    suffix={<CheckOutlined onClick={() => handleSaveProject(project.id)} />}
                  />
                ) : (
                  <span>{project.name}</span>
                )}
              </Col>
              <Col flex="30%">
                {isEditing(project.id) ? (
                  <Button type="danger" icon={<DeleteOutlined />} onClick={() => handleDeleteProject(project.id)} />
                ) : (
                  <img
                    src="/EditIcon.svg"
                    alt="Edit"
                    style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                    onClick={() => handleEditProject(project.id)}
                    onMouseOver={e => e.currentTarget.src = "/EditIcon_Hover.svg"}
                    onMouseOut={e => e.currentTarget.src = "/EditIcon.svg"}
                  />
                )}
              </Col>
              <Col flex="40%">
                <span>Created: {project.createdDate}</span>
              </Col>
              <Col flex="5%">
                <img
                  src="/DeleteIcon.svg"
                  alt="Delete"
                  style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                  onClick={() => handleDeleteProject(project.id)}
                  onMouseOver={e => e.currentTarget.src = "/DeleteIcon_Hover.svg"}
                  onMouseOut={e => e.currentTarget.src = "/DeleteIcon.svg"}
                />
              </Col>
            </Row>
          </Card>
        ))}

        <Modal
          title="Confirm Delete"
          visible={deleteConfirmationVisible}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          okText="Yes"
          cancelText="No"
        >
          <div style={{ display: 'flex' }}>
            <img src="/Question.svg" alt="Project" style={{ width: '18px', height: '18px', marginTop: '18px', marginRight: '8px' }} />
            <p>Are you sure you want to delete the project?</p>
          </div>
          <p style={{ marginTop: '0px', marginLeft: '26px' }}>This action can't be undone.</p>
        </Modal>

      </Content>
    </Layout>
  );
};

export default App;
