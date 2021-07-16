import React, { ReactNode } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface SidebarLayoutProps {
  sidebarComponent: ReactNode;
  mainComponent: ReactNode;
}

function SidebarLayout({sidebarComponent, mainComponent}: SidebarLayoutProps) {
  return (
    <Container className="sidebar-layout g-0">
      <Row>
        <Col md={3}>
          <aside>
            {sidebarComponent}
          </aside>
        </Col>
        <Col md={9}>
          <main>
            {mainComponent}
          </main>
        </Col>
      </Row>
    </Container>
  )
}

export default SidebarLayout;