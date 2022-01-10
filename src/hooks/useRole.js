import { useSession } from '../contexts/Session';

const useRole = () => {

  const { session } = useSession();

  const Role = {
    SUPER_ADMIN: (() => session.user && session.user.roles.includes('SUPER ADMIN'))(),
    ADMIN: (() => session.user && session.user.roles.includes('ADMIN'))(),
    USER: (() => session.user && session.user.roles.includes('USER'))()
  }

  return { Role }
}

export default useRole;
