import adminClient from "../client/admin.client";

const getPendingRequests = async (page = 1, limit = 10) => {
  try {
    const res = await adminClient.get(`/pending?page=${page}&limit=${limit}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const approveManager = async (userId) => {
  try {
    const res = await adminClient.put(`/approve/${userId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const rejectManager = async (userId) => {
  try {
    const res = await adminClient.delete(`/reject/${userId}`);
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

const getAllManagersByStatus = async (status, page = 1, limit = 10) => {
  try {
    const res = await adminClient.get(
      `/UserWithStatus?isapproved=${status}&page=${page}&limit=${limit}`,
    );
    return res?.data;
  } catch (err) {
    throw { err };
  }
};

export {
  getPendingRequests,
  approveManager,
  rejectManager,
  getAllManagersByStatus,
};
