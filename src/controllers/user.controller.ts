import type { Context } from "elysia";
import { getAllUsers, updateUser, softDeleteUser } from "../services/user.service";

export const getUserController = async ({ set }: Context) => {
  try {
    const users = await getAllUsers();

    return {
      message: "Users retrieved successfully",
      users,
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};

export const getUserByIdController = async ({ params, set }: Context & { params: { id: string } }) => {
  try {
    const { id } = params;
    const users = await getAllUsers();
    const user = Array.isArray(users) ? users.find(u => u.id === id) : undefined;

    if (!user) {
      set.status = 404;
      return { message: "User not found" };
    }

    return {
      message: "User retrieved successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
}

export const updateUserController = async ({
  body,
  set,
  params,
}: Context & {
  user: {
    id: string;
    role: 'admin' | 'user';
  };
}) => {
  try {
    const { id } = params;

    const { name, email, phone, role } = body as {
      name?: string;
      email?: string;
      phone?: string;
      role?: 'admin' | 'user';
    };

    const updated = await updateUser(id, { name, email, phone, role });

    return {
      message: 'User updated successfully',
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        phone: updated.phone,
        role: updated.role,
      },
    };
  } catch (error) {
    console.log(error)
    set.status = 500;
    return { message: 'Internal server error', error };
  }
};


export const deleteUserController = async ({ params, set }: Context & { params: { id: string } }) => {
  try {
    const { id } = params;
    await softDeleteUser(id);
    return { message: "User deleted successfully" };
  } catch (error) {
    set.status = 500;
    return { message: "Internal server error", error };
  }
};
