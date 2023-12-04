import { AuthUser } from './authModels'
import { authService } from './authService'

export async function GetUser(request: Request): Promise<AuthUser> {
    const header = request.headers.get('authorization');

    if (header == undefined) {
        throw new Error('Auth error: fetching user');
    }

    const user = await authService.getUser(header);

    if (user == undefined) {
        throw new Error('Auth error: fetching user');
    }

    return user;
}
