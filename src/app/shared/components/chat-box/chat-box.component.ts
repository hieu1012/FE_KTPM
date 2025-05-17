import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatBoxService } from '@services/chatbox.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatBoxComponent implements OnInit, AfterViewChecked {
  user: any = null;
  inputMessage: string = '';
  messages: any[] = [];

  isChatOpen = false; // ⬅️ biến để toggle icon/chat

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(private chatBoxService: ChatBoxService) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        this.user = JSON.parse(storedUser);
      } catch (error) {
        console.error('Lỗi parse user từ localStorage:', error);
      }
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  send(): void {
    const trimmed = this.inputMessage.trim();
    if (!trimmed) return;

    const userMessage = {
      id: Date.now(),
      userId: this.user.id,
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString()
    };
    this.messages.push(userMessage);

    this.chatBoxService.sendMessage(this.user.id, trimmed).subscribe((response: any) => {
      const botReply = response.data || response;
      this.messages.push(botReply);
    });

    this.inputMessage = '';
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      try {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      } catch (err) { }
    }
  }
}
