import attachmentClient from "../client/attachment.client";

const getAllAttachmentPerProject = async (projectId) => {
  try {
    const res = await attachmentClient.get(
      `/AttachmentByProjectID?Id=${projectId}`,
    );
    console.log(res);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const downloadAttachment = async (attachmentId) => {
  try {
    const res = await attachmentClient.get(`/download/${attachmentId}`);
    console.log(res);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getAttachment = async (taskId) => {
  try {
    const res = await attachmentClient.get(`/task/${taskId}`);
    console.log(res);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

export { getAllAttachmentPerProject, getAttachment, downloadAttachment };
