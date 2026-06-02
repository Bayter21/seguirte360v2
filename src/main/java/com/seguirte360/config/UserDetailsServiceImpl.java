package com.seguirte360.config;import org.springframework.security.core.userdetails.*;import org.springframework.stereotype.Service;import com.seguirte360.repo.UsuarioRepo;import com.seguirte360.model.Usuario;
@Service public class UserDetailsServiceImpl implements UserDetailsService{
private final UsuarioRepo repo; public UserDetailsServiceImpl(UsuarioRepo r){repo=r;}
@Override public UserDetails loadUserByUsername(String username)throws UsernameNotFoundException{
Usuario u=repo.findByUsername(username); if(u==null) throw new UsernameNotFoundException("no user");
return User.withUsername(u.getUsername()).password(u.getPassword()).roles(u.getRole()).build();}}
