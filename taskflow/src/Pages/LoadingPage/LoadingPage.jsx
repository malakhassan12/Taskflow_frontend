import React, { useEffect, useState } from 'react';
import { Spin, Typography, Flex, Progress, theme } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Logo from '../../Components/Logo/Logo';

const { Text } = Typography;

const LoadingPage = () => {
  const { token } = theme.useToken();
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");

  const messages = [
    "Initializing...",
    "Loading assets...",
    "Connecting to server...",
    "Setting up workspace...",
    "Almost ready...",
    "Starting application..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Change message based on progress
        const messageIndex = Math.floor(prev / 20);
        if (messageIndex < messages.length) {
          setLoadingMessage(messages[messageIndex]);
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <Flex
      justify="center"
      align="center"
      style={{
        height: "100vh",
        width: "100%",
        background: `linear-gradient(135deg, ${token.colorBgContainer} 0%, ${token.colorBgLayout} 100%)`,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        flexDirection: "column",
        gap: 40,
      }}
    >
      {/* Logo Container with Ripple Effect */}
      <div style={{ position: "relative" }}>
        {/* Ripple Background */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${token.colorPrimary}10, transparent)`,
            animation: "ripple 2s ease-out infinite",
          }}
        />
        
        {/* Main Logo */}
       <Logo/>
      </div>

      {/* Loading Indicator */}
      <Spin
        size="large"
        indicator={
          <LoadingOutlined 
            spin 
            style={{ 
              fontSize: 36, 
              color: token.colorPrimary,
              animation: "spin 1s linear infinite"
            }} 
          />
        }
      />

      {/* Progress Section */}
      <div style={{ width: 320, textAlign: "center" }}>
        <Progress
          percent={progress}
          status="active"
          showInfo={true}
          strokeColor={{
            from: token.colorPrimary,
            to: token.colorPrimary,
          }}
          railColor={token.colorBorderSecondary}
          strokeLinecap="round"
          format={(percent) => (
            <span style={{ color: token.colorPrimary, fontWeight: 600 }}>
              {percent}%
            </span>
          )}
        />
        
        {/* Loading Message */}
        <Text 
          type="secondary" 
          style={{ 
            fontSize: 13, 
            display: "block", 
            marginTop: 12,
            letterSpacing: "0.5px",
            fontWeight: 500
          }}
        >
          {loadingMessage}
        </Text>
      </div>

      {/* Version Info */}
      <Text 
        type="secondary" 
        style={{ 
          fontSize: 11, 
          position: "absolute", 
          bottom: 24,
          opacity: 0.6
        }}
      >
        Version 2.0.0
      </Text>

      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes ripple {
            0% {
              width: 90px;
              height: 90px;
              opacity: 1;
            }
            100% {
              width: 200px;
              height: 200px;
              opacity: 0;
            }
          }
          
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </Flex>
  );
};

export default LoadingPage;