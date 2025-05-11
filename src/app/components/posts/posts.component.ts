import { Component } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../interfaces/post';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [CommonModule, RouterModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})

export class PostsComponent {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
    });
  }
}

