const BASE = 'https://archireach.onrender.com/api/pages/architecture';

// Helper: get JWT token from localStorage
function getAuthToken() {
  return localStorage.getItem('authToken');
}

// ✅ GET architecture page for a specific user
export async function getArchitecturePage(userId) {
  try {
    if (!userId) throw new Error('User ID is required');

    const res = await fetch(`${BASE}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      if (res.status === 404) return null; // page not found
      throw new Error('Failed to fetch architecture page');
    }

    return await res.json();
  } catch (error) {
    console.error('❌ getArchitecturePage error:', error);
    throw error;
  }
}

// ✅ CREATE architecture page for a specific user
export async function createArchitecturePage(payload, userId) {
  try {
    if (!userId) throw new Error('User ID is required');

    const res = await fetch(BASE, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...payload, userId })
    });

    if (!res.ok) throw new Error('Failed to create architecture page');
    return await res.json();
  } catch (error) {
    console.error('❌ createArchitecturePage error:', error);
    throw error;
  }
}

// ✅ UPDATE architecture page by ID
export async function updateArchitecturePage(payload, id) {
  try {
    if (!id) throw new Error('Page ID is required');

    const res = await fetch(`${BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Failed to update architecture page');
    return await res.json();
  } catch (error) {
    console.error('❌ updateArchitecturePage error:', error);
    throw error;
  }
}

// ✅ DELETE architecture page by ID
export async function deleteArchitecturePage(id) {
  try {
    if (!id) throw new Error('Page ID is required');

    const res = await fetch(`${BASE}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) throw new Error('Failed to delete architecture page');
    return await res.json();
  } catch (error) {
    console.error('❌ deleteArchitecturePage error:', error);
    throw error;
  }
}

// ✅ Default export
export default {
  getArchitecturePage,
  createArchitecturePage,
  updateArchitecturePage,
  deleteArchitecturePage,
};
